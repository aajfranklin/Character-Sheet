import update from 'immutability-helper';
import initialState from '../../../model';
import * as types from './actions/actionTypes';
import { deepCopy } from '../../../testUtils';

export default function kiReducer(state = { ...initialState.ki }, action) {
  switch (action.type) {
    case types.CACHE_ABILITY: {
      const abilityToCache = { ...state.abilities.find(ability => ability.uuid === action.uuid) };
      return update(state, {
        abilityCache: {
          $set: state.abilityCache.concat(abilityToCache),
        },
      });
    }

    case types.CLEAR_ABILITY_CACHE: {
      const abilityCacheIndex = state.abilityCache
        .findIndex(ability => ability.uuid === action.uuid);

      return update(state, {
        abilityCache: {
          $splice: [[abilityCacheIndex, 1]],
        },
      });
    }

    case types.DELETE_ABILITY: {
      return update(state, {
        abilities: {
          $splice: [[action.index, 1]],
        },
      });
    }

    case types.LOAD_ABILITIES_SUCCESS: {
      return update(state, {
        abilities: { $set: action.abilities },
      });
    }

    case types.REVERT_ABILITY: {
      const cachedAbility = { ...state.abilityCache.find(ability => ability.uuid === action.uuid) };
      const abilityIndex = state.abilities.findIndex(ability => ability.uuid === action.uuid);
      cachedAbility.editing = false;

      return update(state, {
        abilities: { [abilityIndex]: { $set: cachedAbility } },
      });
    }

    case types.SORT_ABILITIES: {
      for (let i = 0; i < state.abilities.length; i += 1) {
        if (state.abilities[i].editing) return state;
      }

      const sortedAbilities = deepCopy(state.abilities)
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        .sort((a, b) => parseInt(a.cost, 10) - parseInt(b.cost, 10));

      return update(state, {
        abilities: { $set: sortedAbilities },
      });
    }

    case types.SUBMIT_NEW_ABILITY_SUCCESS: {
      return update(state, {
        abilities: { $push: [action.ability] },
      });
    }

    case types.TOGGLE_ADD_ABILITY_FORM: {
      return update(state, {
        showAbilityForm: { $set: !state.showAbilityForm },
        newAbility: {
          $set: {},
        },
        abilityFormValidation: { $set: {} },
      });
    }

    case types.TOGGLE_EDIT_ABILITY: {
      const abilityIndex = state.abilities.findIndex(ability => ability.uuid === action.uuid);

      return update(state, {
        abilities: {
          [abilityIndex]: {
            editing: { $set: !state.abilities[abilityIndex].editing },
            editValidation: { $set: {} },
          },
        },
      });
    }

    case types.UPDATE_ABILITY: {
      return update(state, {
        abilities: { [action.index]: { [action.target]: { $set: action.value } } },
      });
    }

    case types.UPDATE_NEW_ABILITY: {
      return update(state, {
        newAbility: { [action.target]: { $set: action.value } },
      });
    }

    case types.VALIDATE_EDIT: {
      const abilityIndex = state.abilities.findIndex(ability => ability.uuid === action.uuid);

      return update(state,
        {
          abilities:
            {
              [abilityIndex]:
                {
                  editValidation:
                    {
                      [action.target]: { $set: action.valid },
                    },
                },
            },
        });
    }

    case types.VALIDATE_NEW_ABILITY: {
      return update(state, {
        abilityFormValidation: { [action.target]: { $set: action.valid } },
      });
    }

    default:
      return state;
  }
}
