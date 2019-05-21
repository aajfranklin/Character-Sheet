import reducer from './reducer.js'
import * as types from './actionTypes';
import { testState } from '../testUtils/testState.js';

describe('reducer', () => {

    it('should return the initial state', () => {

        expect(reducer({...testState}, {})).toStrictEqual(testState);

    });

    it('should handle CHANGE_FORM_TEXT', () => {
        const newState = reducer({...testState},
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

    it('should handle DELETE', () => {
        const newState = reducer( {...testState},
            {
                type: types.DELETE,
                page: 'ki',
                category: 'abilities',
                id: 0
            }
        );
        expect(newState.ki.abilities.length).toBe(testState.ki.abilities.length - 1);
        expect(newState.ki.abilities[0].name).toBe(testState.ki.abilities[1].name);
    });

    it('should handle SUBMIT_NEW_ABILITY', () => {
        const initialAbilityCount = testState.ki.abilities.length;
        const newAbility = {
            name: 'name',
            cost: 'cost',
            damage: 'damage',
            saving: 'saving',
            effect: 'effect'
        };

        testState.ki.newAbility = newAbility;

        const newState = reducer({...testState},
            {type: types.SUBMIT_NEW_ABILITY,
                ability: {...newAbility}
            }
        );
        expect(newState.ki.abilities.length).toBe(initialAbilityCount + 1);
        expect(newState.ki.abilities[initialAbilityCount]).toStrictEqual(newAbility);

    });

    it('should handle TOGGLE_ABILITY_FORM', () => {
        const newState = reducer({...testState},
            {type: types.TOGGLE_ABILITY_FORM
            }
        );
        expect(newState.ki.showAbilityForm).toBe(true);
        expect(newState.ki.newAbility).toStrictEqual({name: '', cost: '', damage: '', saving: '', effect: '' });

    });

});
