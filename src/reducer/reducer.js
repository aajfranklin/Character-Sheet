import update from 'react-addons-update';
import { initialState } from '../model.js';
import * as types from './actionTypes.js';

function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        case types.CACHE_ABILITY: {
            const ability = {...state.ki.abilities[action.id]};
            ability.id = action.id;

            return update(state, {
                ki: {
                    abilityEditCache: {
                        $set: state.ki.abilityEditCache.concat(ability)
                    }
                }
            });
        }

        case types.CHANGE_FORM_TEXT: {
            action.event.persist();
            const target = action.event.target.name;
            const value = action.event.target.value;

            return update(state, {
                ki: {newAbility: {[target]: {$set: value}}}
            });
        }

        case types.CLEAR_ABILITY_CACHE: {
            return update(state, {
                ki: {
                    abilityEditCache: {
                        $apply: (abilities) => {
                            const index = abilities.findIndex((ability) => ability.id === action.id);
                            abilities.splice(index, 1);
                            return abilities;
                        }
                    }
                }
            });
        }

        case types.DELETE_ABILITY: {
            return update(state, {
                ki: {
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
                }
            });
        }

        case types.REVERT_ABILITY: {
            const ability = {...state.ki.abilityEditCache.find((ability) => ability.id === action.id)};
            ability.editing = false;
            delete ability.id;

            return update(state, {
                ki: {abilities: {[action.id]: {$set: ability}}}
            });
        }

        case types.SUBMIT_NEW_ABILITY: {
            return update(state, {
                ki: {
                    abilities: {$set: state.ki.abilities.concat({...state.ki.newAbility})},
                }
            });
        }

        case types.TOGGLE_EDIT_ABILITY: {
            return update(state, {
                ki: {
                    abilities: {
                        [action.id]: {
                            editing: {$set: !state.ki.abilities[action.id].editing}
                        }
                    }
                }
            });
        }

        case types.TOGGLE_ADD_ABILITY_FORM: {
            return update(state, {
                ki: {
                    showAbilityForm: {$set: !state.ki.showAbilityForm},
                    newAbility: {$set: {name: '', cost: '', damage: '', saving: '', effect: ''}}
                }
            });
        }

        case types.UPDATE_ABILITY: {
            action.event.persist();
            const target = action.event.target.name;
            const value = action.event.target.value;

            return update(state, {
                ki: { abilities: { [action.id]: { [target]: { $set: value } } } }
            });
        }

        default:
            return state;
    }
}

export default reducer;
