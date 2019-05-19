import reducer from './reducer.js'
import * as types from './actionTypes';
import { initialState } from '../model.js';

describe('reducer', () => {

    it('should return the initial state', () => {

        expect(reducer({...initialState}, {})).toStrictEqual(initialState);

    });

    it('should handle TOGGLE_ABILITY_FORM', () => {

        const newState = reducer({...initialState},
            {type: types.TOGGLE_ABILITY_FORM
            }
        );
        expect(newState.ki.showAbilityForm).toBe(true);

    });

});
