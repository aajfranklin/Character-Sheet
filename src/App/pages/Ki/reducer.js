import update from 'immutability-helper';
import { initialState } from '../../../model';
import * as types from './actions/actionTypes';
import { deepCopy } from '../../../testUtils/testHelpers';

export default function kiReducer(state = { ...initialState.ki }, action) {
    switch (action.type) {

        case types.CACHE_ABILITY: {
            const ability = {...state.abilities.find(ability => ability.uuid === action.uuid)};
            return update(state, {
                abilityEditCache: {
                    $set: state.abilityEditCache.concat(ability)
                }
            });
        }

        case types.CHANGE_FORM_TEXT: {
            return update(state, {
                newAbility: {[action.target]: {$set: action.value}}
            });
        }

        case types.CLEAR_ABILITY_CACHE: {
            const abilityCacheIndex = state.abilityEditCache.findIndex(ability => ability.uuid === action.uuid);

            return update(state, {
                abilityEditCache: {
                    $splice: [[abilityCacheIndex, 1]]
                }
            });
        }

        case types.DELETE_ABILITY: {
            return update(state, {
                abilities: {
                    $splice: [[action.index, 1]]
                },
            });
        }

        case types.LOAD_ABILITIES_SUCCESS: {
            return update(state, {
                abilities: {$set: action.abilities}
            });
        }

        case types.REVERT_ABILITY: {
            const ability = {...state.abilityEditCache.find(ability => ability.uuid === action.uuid)};
            const abilityIndex = state.abilities.findIndex(ability => ability.uuid === action.uuid);
            ability.editing = false;

            return update(state, {
                abilities: {[abilityIndex]: {$set: ability}}
            });
        }

        case types.SORT_ABILITIES: {
            for (let i = 0; i < state.abilities.length; i++) {
                if (state.abilities[i].editing) return state;
            }

            const sortedAbilities = deepCopy(state.abilities).sort((a, b) => parseInt(a.cost) - parseInt(b.cost));

            return update(state, {
                abilities: {$set: sortedAbilities}
            })
        }

        case types.SUBMIT_NEW_ABILITY_SUCCESS: {
            return update(state, {
                abilities: {$push: [action.ability]},
            });
        }

        case types.TOGGLE_ADD_ABILITY_FORM: {
            return update(state, {
                showAbilityForm: {$set: !state.showAbilityForm},
                newAbility: {$set: {name: '', cost: '', damage: '', boost: '', saving: '', effect: ''}},
                newAbilityIsValid: {$set: {name: true, cost: true, damage: true, boost: true, saving: true, effect: true}}
            });
        }

        case types.TOGGLE_EDIT_ABILITY: {
            const abilityIndex = state.abilities.findIndex(ability => ability.uuid === action.uuid);

            return update(state, {
                abilities: {
                    [abilityIndex]: {
                        editing: {$set: !state.abilities[abilityIndex].editing}
                    }
                }
            });
        }

        case types.UPDATE_ABILITY: {
            return update(state, {
                abilities: { [action.index]: { [action.target]: { $set: action.value } } }
            });
        }

        case types.VALIDATE_ABILITY: {
            return update(state, {
                newAbilityIsValid: { [action.target]: {$set: action.valid}}
            });
        }

        default:
            return state;
    }
}
