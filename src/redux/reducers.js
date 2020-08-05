import { SEARCH_TESTERS, CLEAR_ERROR } from "./actions";
const HttpStatus = require('http-status-codes');

export default (state, action) => {

    switch (action.type) {
        case SEARCH_TESTERS :
            return {
                ...state,
                statusCode: action.statusCode,
                testers: action.json.testers,
                error: action.statusCode === HttpStatus.OK ? undefined : action.json.error,
            };
        case CLEAR_ERROR :
            return {
                ...state,
                error: undefined
            }
        default:
            return {
                statusCode: HttpStatus.OK,
                testers: [],
                error: undefined
            };
    }
}