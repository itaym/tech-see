import React, { useState } from 'react';
import './TestersTable.css';
import { connect } from "react-redux";

export const sortByAttr = function (array, sortBy) {
    array.sort(function (a, b) {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
    })
}

export const getBugCSV = function (bugs) {
    return bugs.map(bug => bug.title).join(', ');
}

function TestersTable (props) {

    const [ sortBy, setSortBy ] = useState('firstName');
    const [ testers, setTesters ] = useState(props.testers);

    const onSort = function (sortBy) {
        sortByAttr(testers, sortBy);
        setSortBy(sortBy);
    }

    if (props.testers !== testers) {
        sortByAttr(props.testers, sortBy);
        setTesters(props.testers);
    }

    return (
        <div className={"container card testers-table"}>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"
                        className={`${sortBy === 'firstName' ? 'sorted-column' : ''}`}
                        onClick={onSort.bind(null, 'firstName')}>First Name</th>
                    <th scope="col"
                        className={`${sortBy === 'lastName' ? 'sorted-column' : ''}`}
                        onClick={onSort.bind(null, 'lastName')}>Last Name</th>
                    <th scope="col"
                        className={`${sortBy === 'country' ? 'sorted-column' : ''}`}
                        onClick={onSort.bind(null, 'country')}>Country</th>
                    <th scope="col">Bugs</th>
                </tr>
                </thead>
                <tbody>
                {testers.map((tester, index) => {
                    const { firstName, lastName, country, bugs } = tester;
                    return (
                        <tr key={`${index} ${firstName} ${lastName}`}>
                            <th scope="row">{index + 1}</th>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{country}</td>
                            <td>{getBugCSV(bugs)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(TestersTable);