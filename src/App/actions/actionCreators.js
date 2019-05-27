import * as types from './actionTypes';

export const toggleShowError = (errorMessage) => {
    return({
        type: types.TOGGLE_SHOW_ERROR,
        errorMessage
    });
};
