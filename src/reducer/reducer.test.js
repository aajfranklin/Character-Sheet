import reducer from './reducer.js'
import * as types from './actionTypes';
import { testState } from '../testUtils/testState.js';

describe('reducer', () => {

    it('should return the initial state', () => {

        expect(reducer({...testState}, {})).toStrictEqual(testState);

    });

    it('should handle CACHE_ABILITY', () => {
       const newState = reducer({...testState},
           {
               type: types.CACHE_ABILITY,
               id: 0
           }
       );
       expect(newState.ki.abilityEditCache[0]).toStrictEqual(newState.ki.abilities[0]);
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

    it('should handle CLEAR_ABILITY_CACHE', () => {
        testState.ki.abilityEditCache[0] = {name: 'testCachedAbility'};
        const newState = reducer({...testState},
            {
                type: types.CLEAR_ABILITY_CACHE,
                id: 0
            }
        );
        expect(newState.ki.abilityEditCache.length).toBe(0);
    });

    it('should handle DELETE_ABILITY', () => {
        const newState = reducer( {...testState},
            {type: types.DELETE_ABILITY, id: 1}
        );
        expect(newState.ki.abilities.length).toBe(testState.ki.abilities.length - 1);
        expect(newState.ki.abilities[1].name).toBe(testState.ki.abilities[2].name);
    });

    it('should handle REVERT_ABILITY', () => {
        testState.ki.abilityEditCache[0] = {name: 'testCachedAbility', id: 0};
        const newState = reducer({...testState},
            {
                type: types.REVERT_ABILITY,
                id: 0
            }
        );
        expect(newState.ki.abilities[0]).toStrictEqual({name: 'testCachedAbility', editing: false});
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
            {type: types.SUBMIT_NEW_ABILITY,}
        );
        expect(newState.ki.abilities.length).toBe(initialAbilityCount + 1);
        expect(newState.ki.abilities[initialAbilityCount]).toStrictEqual(newAbility);

    });

    it('should handle TOGGLE_ADD_ABILITY_FORM', () => {
        const newState = reducer({...testState},
            {type: types.TOGGLE_ADD_ABILITY_FORM}
        );
        expect(newState.ki.showAbilityForm).toBe(true);
        expect(newState.ki.newAbility).toStrictEqual({name: '', cost: '', damage: '', saving: '', effect: '' });

    });

    it('should handle UPDATE_ABILITY', () => {
        const newState = reducer({...testState},
            {
                type: types.UPDATE_ABILITY,
                id: 0,
                event: {
                    target: {
                        name: 'effect',
                        value: 'editedText'
                    },
                    persist: () => {}
                }
            }
        );
        expect(newState.ki.abilities[0].effect).toBe('editedText');
    });

});
