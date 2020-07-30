import React, {PureComponent} from 'react';
import './TestersTable.css';
import { connect } from "react-redux";
import { sortTesters } from "../redux/actions";

class TestersTable extends PureComponent {

    state = {
        sortBy: 'firstName'};

    isSorted = (orderBy) => {
        const { sortBy } = this.props;
        return orderBy === sortBy;
    }

    getBugCSV = (tester) => {
        return tester.bugs.map(bug => bug.title).join(', ');
    }

    onSort = (sortBy) => {
        return () => {
            //this.setState((state) => ({...state, sortBy}));
            const { dispatch } = this.props;
            dispatch(sortTesters(sortBy));
        }
    }

    render  () {
        const { testers } = this.props;

        return (
            <div className={"container card testers-table"}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"
                            className={`${this.isSorted('firstName') ? 'sorted-column' : ''}`}
                            onClick={this.onSort('firstName')}>First Name</th>
                        <th scope="col"
                            className={`${this.isSorted('lastName') ? 'sorted-column' : ''}`}
                            onClick={this.onSort('lastName')}>Last Name</th>
                        <th scope="col"
                            className={`${this.isSorted('country') ? 'sorted-column' : ''}`}
                            onClick={this.onSort('country')}>Country</th>
                        <th scope="col">Bugs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {testers.map((tester, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{tester.firstName}</td>
                                <td>{tester.lastName}</td>
                                <td>{tester.country}</td>
                                <td>{this.getBugCSV(tester)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(TestersTable);