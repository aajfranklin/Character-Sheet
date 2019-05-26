import update from 'immutability-helper';
import { initialState } from '../../../model';
import * as types from './actions/actionTypes';

export default function kiReducer(state = { ...initialState.ki }, action) {
    switch (action.type) {

        case types.CACHE_ABILITY: {
            const ability = {...state.abilities[action.id], id: action.id};
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
            const index = state.abilities.findIndex((ability) => ability.id === action.id);

            return update(state, {
                abilityEditCache: {
                    $splice: [[index, 1]]
                }
            });
        }

        case types.DELETE_ABILITY: {
            return update(state, {
                abilities: {
                    $splice: [[action.id, 1]]
                },
                abilityEditCache: {
                    $apply: (abilities) => {
                        abilities.map((ability) => {
                            if (ability.id > action.id) {
                                ability.id -= 1;
                            }
                            return ability;
                        });
                        return abilities;
                    }
                }
            });
        }

        case types.FETCH_ABILITIES: {
            return update(state, {
                abilities: {$set: action.abilities}
            });
        }

        case types.REVERT_ABILITY: {
            const ability = {...state.abilityEditCache.find((ability) => ability.id === action.id)};
            ability.editing = false;
            delete ability.id;

            return update(state, {
                abilities: {[action.id]: {$set: ability}}
            });
        }

        case types.SUBMIT_NEW_ABILITY: {
            return update(state, {
                abilities: {$push: [action.ability]},
            });
        }

        case types.TOGGLE_ADD_ABILITY_FORM: {
            return update(state, {
                showAbilityForm: {$set: !state.showAbilityForm},
                newAbility: {$set: {name: '', cost: '', damage: '', boost: '', saving: '', effect: ''}}
            });
        }

        case types.TOGGLE_EDIT_ABILITY: {
            return update(state, {
                abilities: {
                    [action.id]: {
                        editing: {$set: !state.abilities[action.id].editing}
                    }
                }
            });
        }

        case types.UPDATE_ABILITY: {
            return update(state, {
                abilities: { [action.id]: { [action.target]: { $set: action.value } } }
            });
        }

        default:
            return state;
    }
}
