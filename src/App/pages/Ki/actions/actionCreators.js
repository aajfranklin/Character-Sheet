import * as types from './actionTypes';

export const cacheAbility = (id) => {
    return({
        type: types.CACHE_ABILITY,
        id: id
    });
};

export const changeFormText = (event) => {
    event.persist();
    return({
        type: types.CHANGE_FORM_TEXT,
        target: event.target.name,
        value: event.target.value
    });
};

export const clearAbilityCache = (id) => {
    return({
        type: types.CLEAR_ABILITY_CACHE,
        id: id
    });
};

export const deleteAbility = (id) => {
    return({
        type: types.DELETE_ABILITY,
        id: id
    });
};

export const revertAbility = (id) => {
  return({
      type: types.REVERT_ABILITY,
      id: id
  });
};

export const submitNewAbility = () => {
    return({
        type: types.SUBMIT_NEW_ABILITY
    });
};

export const toggleAddAbilityForm = () => {
  return({
      type: types.TOGGLE_ADD_ABILITY_FORM
  });
};

export const toggleEditAbility = (id) => {
    return({
        type: types.TOGGLE_EDIT_ABILITY,
        id: id
    })
};

export const updateAbility = (event, id) => {
    event.persist();
    return({
        type: types.UPDATE_ABILITY,
        target: event.target.name,
        value: event.target.value,
        id: id
    });
};
