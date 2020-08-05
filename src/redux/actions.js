const HttpStatus = require('http-status-codes');

export const SEARCH_TESTERS = Symbol('SEARCH_TESTERS');
export const CLEAR_ERROR = Symbol('CLEAR_ERROR');

export const searchTesters = (name) => async (dispatch) => {

    dispatch(clearError());
    let json = {};
    try {
         const response = await fetch(`https://cors-anywhere.herokuapp.com/https://test-api.techsee.me/api/ex/${name}`);
         json.statusCode = response.status;
         const text = await response.text();
         json = { testers: text ? [].concat(JSON.parse(text)) : []};
        // json = { testers: [].concat([{"firstName":"Melisa","lastName":"Kadosh","country":"Israel","device":"iPhone 6","bugs":[{"id":1,"title":"button misplaced"},{"id":4,"title":"incorrect home page"}]},{"firstName":"Lynda","lastName":"Golumb","country":"New Zealand","device":"Huawei P10","bugs":[{"id":2,"title":"device is stuck"},{"id":3,"title":"can't load application"},{"id":5,"title":"no input validation"}]},{"firstName":"Artem","lastName":"Puzailov","country":"Ukraine","device":"Galaxy S7","bugs":[{"id":7,"title":"Chrome displays jibberish"}]},{"firstName":"Rob","lastName":"Rabbi","country":"UK","device":"Xiomi Note 5","bugs":[{"id":11,"title":"invalid text"},{"id":21,"title":"shifted display"},{"id":13,"title":"mis aligned buttons"},{"id":15,"title":"server crash"}]},{"firstName":"Neved","lastName":"Dorsell","country":"Sweden","device":"Nokia D56","bugs":[{"id":13,"title":"slow loading"},{"id":16,"title":"pixeled video"}]},{"firstName":"Silvi","lastName":"Rushfeld","country":"Germany","device":"LG G5","bugs":[{"id":11,"title":"blank end page"}]},{"firstName":"Will","lastName":"Debill","country":"US","device":"iPhone X","bugs":[{"id":11,"title":"login stuck"},{"id":21,"title":"shifted display"}]}])};
        // json.statusCode = HttpStatus.OK;
    }
    catch {
        json = {
            testers: [],
            statusCode: HttpStatus.NOT_FOUND,
            error: `${json.statusCode || ''} Temporary error occurred, please try again later`,
        }
    }

    dispatch({
        type: SEARCH_TESTERS,
        json
    });
};

export const clearError = () => async (dispatch, state) => {
    const { error } = state;

    if (error === '') return;

    dispatch({
        type: CLEAR_ERROR,
    });
};
