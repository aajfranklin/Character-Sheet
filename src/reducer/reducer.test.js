import reducer from './reducer.js'
import * as types from './actionTypes';
import { initialState } from '../model.js';

describe('reducer', () => {

    it('should return the initial state', () => {

        expect(reducer({...initialState}, {})).toStrictEqual(initialState);

    });

    it('should handle CHANGE_FORM_TEXT', () => {
        const newState = reducer({...initialState},
            {
                type: types.CHANGE_FORM_TEXT,
                event: {
                    target: { name: 'name', value: 'testValue' },
                    persist: () => {}
                },
            }
        );
        expect(newState.ki.newAbility.name).toBe('testValue');
    });

    it('should handle SUBMIT_NEW_ABILITY', () => {
        const initialAbilityCount = initialState.ki.abilities.length;
        const newAbility = {
            name: 'name',
            cost: 'cost',
            damage: 'damage',
            saving: 'saving',
            effect: 'effect'
        };

        initialState.ki.newAbility = newAbility;

        const newState = reducer({...initialState},
            {type: types.SUBMIT_NEW_ABILITY,
                ability: {...newAbility}
            }
        );
        expect(newState.ki.abilities.length).toBe(initialAbilityCount + 1);
        expect(newState.ki.abilities[initialAbilityCount]).toStrictEqual(newAbility);

    });

    it('should handle TOGGLE_ABILITY_FORM', () => {
        const newState = reducer({...initialState},
            {type: types.TOGGLE_ABILITY_FORM
            }
        );
        expect(newState.ki.showAbilityForm).toBe(true);
        expect(newState.ki.newAbility).toStrictEqual({name: '', cost: '', damage: '', saving: '', effect: '' });

    });

});
