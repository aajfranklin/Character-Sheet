import update from 'immutability-helper';
import { initialState } from '../model';
import * as types from './actions/actionTypes';

export default function appReducer(state = { ...initialState.app }, action) {
    switch (action.type) {

        case types.LOAD_STATS_SUCCESS: {
            return update(state, {
                stats: {$set: action.stats}
            });
        }

        case types.TOGGLE_SHOW_ERROR: {
            return update(state, {
                showError: {$set: !state.showError},
                errorMessage: {$set: action.errorMessage}
            });
        }

        case types.UPDATE_STAT: {
            return update(state, {
                stats: { [action.stat]: {$set: action.value}}
            })
        }

        default:
            return state;
    }
}
