import update from 'immutability-helper';
import { initialState } from '../../../model.js';
import * as types from './actions/actionTypes.js';

export default function kiReducer(state = { ...initialState.ki }, action) {
    switch (action.type) {

        case types.CACHE_ABILITY: {
            const ability = {...state.abilities[action.id]};
            ability.id = action.id;

            return update(state, {
                abilityEditCache: {
                    $set: state.abilityEditCache.concat(ability)
                }
            });
        }

        case types.CHANGE_FORM_TEXT: {
            action.event.persist();
            const target = action.event.target.name;
            const value = action.event.target.value;

            return update(state, {
                newAbility: {[target]: {$set: value}}
            });
        }

        case types.CLEAR_ABILITY_CACHE: {
            return update(state, {
                abilityEditCache: {
                    $apply: (abilities) => {
                        const index = abilities.findIndex((ability) => ability.id === action.id);
                        abilities.splice(index, 1);
                        return abilities;
                    }
                }
            });
        }

        case types.DELETE_ABILITY: {
            return update(state, {
                abilities: {
                    $apply: (abilities) => {
                        abilities.splice(action.id, 1);
                        return abilities;
                    }
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
                abilities: {$set: state.abilities.concat({...state.newAbility})},
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

        case types.TOGGLE_ADD_ABILITY_FORM: {
            return update(state, {
                showAbilityForm: {$set: !state.showAbilityForm},
                newAbility: {$set: {name: '', cost: '', damage: '', saving: '', effect: ''}}
            });
        }

        case types.UPDATE_ABILITY: {
            action.event.persist();
            const target = action.event.target.name;
            const value = action.event.target.value;

            return update(state, {
                abilities: { [action.id]: { [target]: { $set: value } } }
            });
        }

        default:
            return state;
    }
}
