import { initialState } from '../model';
import * as types from './actionTypes.js';
import update from 'react-addons-update';

function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        case types.TOGGLE_ABILITY_FORM:
            return update(state, {
                ki: { showAbilityForm: { $set: !state.ki.showAbilityForm } }
            });

        default:
            return state;
    }
}

export default reducer;
