import * as types from './actionTypes';
import { isEmpty } from 'lodash';
import {
    apiGatewayDeleteAbility,
    apiGatewayGetAbilities,
    apiGatewayGetAbility,
    apiGatewayPostAbility,
    apiGatewayPutAbility
} from './apiGatewayPromises';

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

export const deleteAbility = (ability) => {
    return dispatch => {
        return(
            apiGatewayDeleteAbility(ability.uuid)
                .then(() => {
                    dispatch(deleteAbilitySuccess(ability));
                })
                .catch(err => {
                    console.log(err);
                })
        )
    }
};

export const deleteAbilitySuccess = (ability) => {
    return({
        type: types.DELETE_ABILITY,
        id: ability.id
    });
};

export const loadAbilities = () => {
    return dispatch => {
        return(
            apiGatewayGetAbilities()
                .then(result => {
                    dispatch(loadAbilitiesSuccess(result.data.abilities));
                })
                .catch(err => {
                    console.log(err);
                })
        )
    };
};

export const loadAbilitiesSuccess = (abilities) => {
    abilities.map(ability => ability.editing = false);

    return({
       type: types.LOAD_ABILITIES_SUCCESS,
       abilities
    });
};

export const revertAbility = (id) => {
  return({
      type: types.REVERT_ABILITY,
      id: id
  });
};

export const saveAbility = (ability) => {
    return dispatch => {
        return(
            apiGatewayPutAbility(ability)
                .then(response => {
                    if (isEmpty(response.data)) {
                        dispatch(clearAbilityCache(ability.id));
                        dispatch(toggleEditAbility(ability.id));
                    } else {
                        dispatch(revertAbility(ability.id));
                        dispatch(clearAbilityCache(ability.id));
                    }
                })
        )
    }
};

export const submitNewAbility = (ability) => {
    return dispatch => {
        return (
            apiGatewayPostAbility(ability)
                .then(() => apiGatewayGetAbility(ability.uuid))
                .then((result) => {
                    const submittedAbility = result.data.ability;
                    submittedAbility.editing = false;
                    dispatch(submitNewAbilitySuccess(submittedAbility));
                    dispatch(toggleAddAbilityForm());
                })
                .catch(err => {
                    console.log(err);
                })
        )
    }
};

export const submitNewAbilitySuccess = (ability) => {
    return({
        type: types.SUBMIT_NEW_ABILITY_SUCCESS,
        ability
    })
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
