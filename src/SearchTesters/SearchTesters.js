import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { searchTesters } from "../redux/actions";
import './SearchTesters.css';

class SearchTesters extends PureComponent {

    state = {
        fetchButtonOK: false,
        sortBy: 'firstName'};

    searchTesters =() => {
        const { fetchButtonOK } = this.state;
        if (!fetchButtonOK) return;

        const { dispatch } = this.props;
        dispatch(searchTesters(this.testersName.value));
    };

    onChange = () => {
        let { fetchButtonOK } = this.state;

        if (fetchButtonOK !== (this.testersName.value.trim().length > 1)) {
            fetchButtonOK = this.testersName.value.trim().length > 1;
            this.setState((state) => ({...state, fetchButtonOK }));
        }
    }

    render  () {
        const { fetchButtonOK } = this.state;
        const { error } = this.props;

        return (
            <div className={"container card search-testers"}>
                <h2> Search Bugs </h2>
                <div className={"form-group"}>
                    <label htmlFor={"testers-name"}>Tester Name:</label>
                        <input
                            id={"testers-name"}
                            name={"testers-name"}
                            className={'form-control'}
                            autoComplete={'off'}
                            maxLength={12}
                            placeholder={'Enter the tester name'}
                            ref={(testersName) => this.testersName = testersName}
                            onChange={this.onChange}
                            type={"text"}
                        />
                        <input
                            disabled={!fetchButtonOK}
                            className={`btn ${!fetchButtonOK ? 'btn-danger disabled' : 'btn-primary'}`}
                            id={'do-search'}
                            onClick={this.searchTesters}
                            type={'button'}
                            value={'Fetch'}/>
                </div>
                {error ?
                <div className={`alert alert-danger error`} role="alert">
                    {error}
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(SearchTesters);