import { SEARCH_TESTERS, SORT_TESTERS } from "./actions";
const HttpStatus = require('http-status-codes');

function sortTesters(testers, sortBy) {
    testers.sort(function (a, b) {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
    });
    return testers;
}
export default (state, action) => {

    switch (action.type) {
        case SEARCH_TESTERS :
            return {
                ...state,
                statusCode: action.statusCode,
                testers: sortTesters(action.json.testers, state.sortBy),
                error: action.statusCode === HttpStatus.OK ? undefined : action.json.error,
            };
        case SORT_TESTERS :
            return {
                ...state,
                sortBy: action.sortBy,
                testers: sortTesters(state.testers, action.sortBy),
            }
        default:
            return {
                statusCode: HttpStatus.OK,
                testers: [],
                sortBy: 'firstName',
                error: undefined
            };
    }
}