import { isEmpty } from 'lodash';
import * as types from './actionTypes';
import {
    apiGatewayDeleteAbility,
    apiGatewayGetAbilities,
    apiGatewayGetAbility,
    apiGatewayPutAbility
} from './apiGatewayPromises';
import { toggleShowError } from "../../../actions/actionCreators";
import * as errors  from "../../../components/Error/ErrorTypes";

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
                .then(response => {
                    if (response.data.ability.uuid === '') {
                        dispatch(deleteAbilityFailed());
                    } else {
                        return dispatch(deleteAbilitySuccess(ability));
                    }
                })
                .catch(err => {
                    console.error(err);
                    dispatch(deleteAbilityFailed());
                })
        )
    }
};

const deleteAbilityFailed = () => {
    return dispatch => {
        dispatch(toggleShowError(errors.DELETE_ABILITY_FAILED));
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
                .then(response => {
                    if (response.data.count === '') {
                        dispatch(loadAbilitiesFailed());
                    } else if (response.data.count === '0') {
                        dispatch(loadAbilitiesSuccess(response.data.abilities));
                        dispatch(toggleShowError(errors.NO_ABILITIES_FOUND));
                    } else {
                        dispatch(loadAbilitiesSuccess(response.data.abilities));
                    }
                })
                .catch(err => {
                    console.error(err);
                    dispatch(loadAbilitiesFailed());
                })
        )
    };
};

const loadAbilitiesSuccess = (abilities) => {
    abilities.map(ability => ability.editing = false);

    return({
       type: types.LOAD_ABILITIES_SUCCESS,
       abilities
    });
};

const loadAbilitiesFailed = () => {
    return dispatch => {
        dispatch(toggleShowError(errors.LOAD_ABILITIES_FAILED))
    }
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
                        dispatch(saveAbilityFailed(ability));
                    }
                })
                .catch(err => {
                    console.error(err);
                    dispatch(saveAbilityFailed(ability));
                })
        )
    }
};

const saveAbilityFailed = (ability) => {
    return dispatch => {
        dispatch(revertAbility(ability.id));
        dispatch(clearAbilityCache(ability.id));
        dispatch(toggleShowError(errors.UPDATE_ABILITY_FAILED));
    }
};

export const submitNewAbility = (ability) => {
    let apiGatewayPutCallSucceeded = false;

    return dispatch => {
        return (
            apiGatewayPutAbility(ability)
                .then(response => {
                    if (isEmpty(response.data)) {
                        apiGatewayPutCallSucceeded = true;
                        return apiGatewayGetAbility(ability.uuid);
                    } else {
                        throw response;
                    }
                })
                .then((response) => {
                    if(response.data.ability.uuid === '') {
                        dispatch(submitNewAbilityFailedGet());
                    } else {
                        const submittedAbility = response.data.ability;
                        submittedAbility.editing = false;
                        dispatch(submitNewAbilitySuccess(submittedAbility));
                        dispatch(toggleAddAbilityForm());
                    }
                })
                .catch(err => {
                    if (apiGatewayPutCallSucceeded) {
                        dispatch(submitNewAbilityFailedGet());
                    } else {
                        dispatch(submitNewAbilityFailedPut());
                    }
                    console.error(err);
                })
        )
    }
};

const submitNewAbilitySuccess = (ability) => {
    return({
        type: types.SUBMIT_NEW_ABILITY_SUCCESS,
        ability
    })
};

const submitNewAbilityFailedPut = () => {
    return dispatch => {
        dispatch(toggleAddAbilityForm());
        dispatch(toggleShowError(errors.SUBMIT_ABILITY_FAILED_PUT));
    }
};

const submitNewAbilityFailedGet = () => {
    return dispatch => {
        dispatch(toggleAddAbilityForm());
        dispatch(toggleShowError(errors.SUBMIT_ABILITY_FAILED_GET));
    }
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
