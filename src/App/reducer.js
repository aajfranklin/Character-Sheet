import update from 'immutability-helper';
import { initialState } from '../model';
import * as types from './actions/actionTypes';

export default function appReducer(state = { ...initialState.app }, action) {
    switch (action.type) {

        case types.TOGGLE_SHOW_ERROR: {
            return update(state, {
                showError: {$set: !state.showError},
                errorMessage: {$set: action.errorMessage}
            });
        }

        default:
            return state;
    }
}
