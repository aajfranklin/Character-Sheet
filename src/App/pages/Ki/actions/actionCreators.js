import { v4 as uuid } from 'uuid';
import * as types from './actionTypes';
import config from '../../../../config';
import getApiGatewayClient from '../../../../apiGatewayClient';

const apiGatewayClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities);

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

export const fetchAbilities = () => {
    return dispatch => {
        apiGatewayClient.invokeApi({}, '', 'GET')
            .then(result => {
                dispatch(fetchAbilitiesSuccess(result.data.abilities));
            })
            .catch(err => {
                console.log(err);
            })
    };
};

const fetchAbilitiesSuccess = (abilities) => {
    abilities.map(ability => ability.editing = false);

    return({
       type: types.FETCH_ABILITIES,
       abilities
    });
};

export const revertAbility = (id) => {
  return({
      type: types.REVERT_ABILITY,
      id: id
  });
};

export const submitNewAbility = (ability) => {
    ability.uuid = uuid();
    const getAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + ability.uuid);

    return dispatch => {
        apiGatewayClient.invokeApi({}, '', 'POST', {}, ability)
            .then(() => getAbilityClient.invokeApi({}, '', 'GET'))
            .then((result) => {
                const submittedAbility = result.data.ability;
                submittedAbility.editing = false;
                dispatch(submitNewAbilitySuccess(submittedAbility));
                dispatch(toggleAddAbilityForm());
            })
            .catch(err => {
                console.log(err);
            })
    };
};

const submitNewAbilitySuccess = (ability) => {
    return({
        type: types.SUBMIT_NEW_ABILITY,
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
