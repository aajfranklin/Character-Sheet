import reducer from './reducer.js'
import * as types from './actions/actionTypes.js';
import testState from '../../../testUtils/testState.js';
import { deepCopy } from "../../../testUtils/testHelpers.js";

const state = deepCopy(testState.ki);

describe('Ki reducer', () => {

    it('should return the initial state', () => {

        expect(reducer(state, {})).toStrictEqual(state);

    });

    it('should handle CACHE_ABILITY', () => {
       const newState = reducer(state,
           {
               type: types.CACHE_ABILITY,
               id: 0
           }
       );
       expect(newState.abilityEditCache[0]).toStrictEqual({...newState.abilities[0], id: 0});
    });

    it('should handle CHANGE_FORM_TEXT', () => {
        const newState = reducer(state,
            {
                type: types.CHANGE_FORM_TEXT,
                target: 'name',
                value: 'testValue'
            }
        );
        expect(newState.newAbility.name).toBe('testValue');
    });

    it('should handle CLEAR_ABILITY_CACHE', () => {
        state.abilityEditCache[0] = {name: 'testCachedAbility'};
        const newState = reducer(state,
            {
                type: types.CLEAR_ABILITY_CACHE,
                id: 0
            }
        );
        expect(newState.abilityEditCache.length).toBe(0);
    });

    it('should handle DELETE_ABILITY', () => {
        const abilityCount = state.abilities.length;
        const lastAbilityName = state.abilities[2].name;
        const newState = reducer( state,
            {type: types.DELETE_ABILITY, id: 1}
        );
        expect(newState.abilities.length).toBe(abilityCount - 1);
        expect(newState.abilities[1].name).toBe(lastAbilityName);
    });

    it('should decrement ability cache id if an ability with a lower index is deleted', () => {
        state.abilityEditCache[1] = {name: 'testDecrement', id: 1};
        const newState = reducer(state,
            {
                type: types.DELETE_ABILITY,
                id: 0
            }
        );
        expect(newState.abilityEditCache[1]).toStrictEqual({name: 'testDecrement', id: 0});
    });

    it('should handle REVERT_ABILITY', () => {
        state.abilityEditCache[0] = {name: 'testCachedAbility', id: 0};
        const newState = reducer(state,
            {
                type: types.REVERT_ABILITY,
                id: 0
            }
        );
        expect(newState.abilities[0]).toStrictEqual({name: 'testCachedAbility', editing: false});
    });

    it('should handle SUBMIT_NEW_ABILITY', () => {
        const initialAbilityCount = state.abilities.length;
        const newAbility = {
            name: 'name',
            cost: 'cost',
            damage: 'damage',
            saving: 'saving',
            effect: 'effect'
        };

        state.newAbility = newAbility;

        const newState = reducer(state,
            {type: types.SUBMIT_NEW_ABILITY,}
        );
        expect(newState.abilities.length).toBe(initialAbilityCount + 1);
        expect(newState.abilities[initialAbilityCount]).toStrictEqual(newAbility);

    });

    it('should handle TOGGLE_ADD_ABILITY_FORM', () => {
        const newState = reducer(state,
            {type: types.TOGGLE_ADD_ABILITY_FORM}
        );
        expect(newState.showAbilityForm).toBe(true);
        expect(newState.newAbility).toStrictEqual({name: '', cost: '', damage: '', saving: '', effect: '' });

    });

    it('should handle UPDATE_ABILITY', () => {
        const newState = reducer(state,
            {
                type: types.UPDATE_ABILITY,
                id: 0,
                target: 'effect',
                value: 'editedText'
            }
        );
        expect(newState.abilities[0].effect).toBe('editedText');
    });

});
