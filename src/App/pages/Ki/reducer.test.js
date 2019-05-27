import reducer from './reducer'
import * as types from './actions/actionTypes';
import testState from '../../../testUtils/testState';
import { deepCopy } from "../../../testUtils/testHelpers";

const state = deepCopy(testState.ki);

describe('Ki reducer', () => {

    it('should return the initial state', () => {

        expect(reducer(state, {})).toStrictEqual(state);

    });

    it('should handle CACHE_ABILITY', () => {
       const newState = reducer(state,
           {
               type: types.CACHE_ABILITY,
               uuid: '2'
           }
       );
       expect(newState.abilityEditCache[0]).toStrictEqual({...newState.abilities[2]});
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
        state.abilityEditCache[1] = {name: 'testCachedAbility'};
        const newState = reducer(state,
            {
                type: types.CLEAR_ABILITY_CACHE,
                id: '1'
            }
        );
        expect(newState.abilityEditCache.length).toBe(1);
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

    it('should handle LOAD_ABILITIES_SUCCESS', () => {
        const abilities = [{name: 'testAbility'}];
        const newState = reducer(state,
            {
                type: types.LOAD_ABILITIES_SUCCESS,
                abilities: abilities
            }
        );
        expect(newState.abilities.length).toBe(1);
        expect(newState.abilities[0].name).toBe('testAbility');
    });

    it('should handle REVERT_ABILITY', () => {
        state.abilityEditCache[0] = {name: 'testCachedAbility', uuid: '2'};
        const newState = reducer(state,
            {
                type: types.REVERT_ABILITY,
                uuid: '2'
            }
        );
        expect(newState.abilities[2]).toStrictEqual({name: 'testCachedAbility', uuid: '2', editing: false});
    });

    it('should handle SORT_ABILITIES', () => {
        state.abilities[0].cost = '100';
        const newState = reducer(state,
            {
                type: types.SORT_ABILITIES
            }
        );
        expect(newState.abilities[0].cost).toBe('2');
        expect(newState.abilities[1].cost).toBe('3');
        expect(newState.abilities[2].cost).toBe('100');
    });

    it('should not sort abilities if one or more abilities are still being edited', () => {
        state.abilities[0].cost = '200';
        state.abilities[1].editing = true;
        const newState = reducer(state,
            {
                type: types.SORT_ABILITIES
            });
        expect(newState.abilities).toStrictEqual(state.abilities);
    });

    it('should handle SUBMIT_NEW_ABILITY_SUCCESS', () => {
        const initialAbilityCount = state.abilities.length;
        const ability = {
            name: 'name',
            cost: 'cost',
            damage: 'damage',
            boost: 'boost',
            saving: 'saving',
            effect: 'effect'
        };

        const newState = reducer(state,
            {type: types.SUBMIT_NEW_ABILITY_SUCCESS, ability: ability}
        );
        expect(newState.abilities.length).toBe(initialAbilityCount + 1);
        expect(newState.abilities[initialAbilityCount]).toStrictEqual(ability);

    });

    it('should handle TOGGLE_ADD_ABILITY_FORM', () => {
        const newState = reducer(state,
            {type: types.TOGGLE_ADD_ABILITY_FORM}
        );
        expect(newState.showAbilityForm).toBe(true);
        expect(newState.newAbility).toStrictEqual({name: '', cost: '', boost: '', damage: '', saving: '', effect: '' });

    });

    it('should handle UPDATE_ABILITY', () => {
        const newState = reducer(state,
            {
                type: types.UPDATE_ABILITY,
                index: 0,
                target: 'effect',
                value: 'editedText'
            }
        );
        expect(newState.abilities[0].effect).toBe('editedText');
    });

});
