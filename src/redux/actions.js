import { options } from '../fetch';
import { fetchMock } from '../fetch/FetchMock';
const HttpStatus = require('http-status-codes');

export const SEARCH_TESTERS = Symbol('SEARCH_TESTERS');
export const SORT_TESTERS = Symbol('SORT_TESTERS');

export const searchTesters = (name) => async (dispatch) => {
    const fetchOptions = Object.assign({}, options);

    // let response;
    let json;
    try {
        // response = await fetch(`https://test-api.techsee.me/api/ex/${name}`, fetchOptions);
        // The concat will make sure I'll get an Array.
        // json = { testers: [].concat(await response.json() || [])};
        // json.statusCode = response.status;

        json = { testers: [].concat(await fetchMock(name) || [])};
        json.statusCode = HttpStatus.OK;
    }
    catch {
        json = {
            testers: [],
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Temporary error occurred, please try again later',
        }
    }

    dispatch({
        type: SEARCH_TESTERS,
        json
    });
};

export const sortTesters = (orderBy) => async (dispatch, state) => {
    let { sortBy } = state;

    if (sortBy === orderBy) return;

    dispatch({
        type: SORT_TESTERS,
        sortBy: orderBy
    });
};
