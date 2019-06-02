import { isEmpty } from 'lodash';
import * as types from './actionTypes';
import { apiGatewayDelete, apiGatewayGetAll, apiGatewayPut } from '../../../../apiGatewayClient';
import { pushError } from '../../../actions/actionCreators';
import * as errors from '../../../components/Error/ErrorTypes';

export const cacheAbility = uuid => ({
  type: types.CACHE_ABILITY,
  uuid,
});

export const clearAbilityCache = uuid => ({
  type: types.CLEAR_ABILITY_CACHE,
  uuid,
});

export const deleteAbility = (uuid, index) => dispatch => (
  apiGatewayDelete('kiAbilities', uuid)
    .then((response) => {
      if (response.data.ability.uuid === '') return dispatch(deleteAbilityFailed());
      dispatch(deleteAbilitySuccess(index));
      return dispatch(sortAbilities());
    })
    .catch(() => {
      dispatch(deleteAbilityFailed());
    })
);

export const deleteAbilitySuccess = index => ({
  type: types.DELETE_ABILITY,
  index,
});

const deleteAbilityFailed = () => (dispatch) => {
  dispatch(pushError(errors.DELETE_ABILITY_FAILED));
};

export const loadAbilities = () => dispatch => (
  apiGatewayGetAll('kiAbilities')
    .then((response) => {
      if (response.data.count === '') {
        dispatch(loadAbilitiesFailed());
      } else if (response.data.count === '0') {
        dispatch(loadAbilitiesSuccess(response.data.abilities));
        dispatch(pushError(errors.NO_ABILITIES_FOUND));
      } else {
        dispatch(loadAbilitiesSuccess(response.data.abilities));
        dispatch(sortAbilities());
      }
    })
    .catch(() => {
      dispatch(loadAbilitiesFailed());
    })
);

const loadAbilitiesSuccess = (abilities) => {
  abilities.map((ab) => {
    const ability = ab;
    ability.editing = false;
    ability.editValidation = {};
    return ability;
  });

  return ({
    type: types.LOAD_ABILITIES_SUCCESS,
    abilities,
  });
};

const loadAbilitiesFailed = () => (dispatch) => {
  dispatch(pushError(errors.LOAD_ABILITIES_FAILED));
};

export const revertAbility = uuid => ({
  type: types.REVERT_ABILITY,
  uuid,
});

export const saveAbility = ability => dispatch => (
  apiGatewayPut('kiAbilities', ability.uuid, ability)
    .then((response) => {
      if (isEmpty(response.data)) {
        if (ability.isNew) {
          const newAbility = ability;
          delete newAbility.isNew;
          dispatch(submitNewAbilitySuccess(newAbility));
          dispatch(toggleAddAbilityForm());
        } else {
          dispatch(clearAbilityCache(ability.uuid));
          dispatch(toggleEditAbility(ability.uuid));
        }
        dispatch(sortAbilities());
      } else {
        dispatch(saveAbilityFailed(ability.uuid));
      }
    })
    .catch(() => {
      dispatch(saveAbilityFailed(ability.uuid));
    })
);

const submitNewAbilitySuccess = ability => ({
  type: types.SUBMIT_NEW_ABILITY_SUCCESS,
  ability,
});

const saveAbilityFailed = uuid => (dispatch) => {
  dispatch(revertAbility(uuid));
  dispatch(clearAbilityCache(uuid));
  dispatch(pushError(errors.SAVE_ABILITY_FAILED));
};

export const sortAbilities = () => ({
  type: types.SORT_ABILITIES,
});

export const toggleAddAbilityForm = () => ({
  type: types.TOGGLE_ADD_ABILITY_FORM,
});

export const toggleEditAbility = uuid => ({
  type: types.TOGGLE_EDIT_ABILITY,
  uuid,
});

export const updateAbility = (event, index) => {
  event.persist();
  return ({
    type: types.UPDATE_ABILITY,
    target: event.target.name,
    value: event.target.value,
    index,
  });
};

export const updateNewAbility = (event) => {
  event.persist();
  return ({
    type: types.UPDATE_NEW_ABILITY,
    target: event.target.name,
    value: event.target.value,
  });
};

export const validateEdit = (target, value, uuid) => ({
  type: types.VALIDATE_EDIT,
  target,
  uuid,
  valid: validateField(target, value),
});

export const validateNewAbility = (target, value) => ({
  type: types.VALIDATE_NEW_ABILITY,
  target,
  valid: validateField(target, value),
});

export const validateField = (target, value) => {
  switch (target) {
    case 'name': case 'effect': {
      return value !== '';
    }
    case 'cost': {
      const costRegExp = new RegExp(/^\d+$/, 'i');
      return costRegExp.test(value);
    }
    case 'damage': case 'boost': {
      const diceRegExp = new RegExp(/^\d+((d\d+)?([+\-x](\d+|STR|DEX|CON|INT|WIS|CHA))?(\+PROF)?(\+LEV)?)$/, 'i');
      return diceRegExp.test(value);
    }
    case 'saving': {
      const saveRegExp = new RegExp(/(^0$)|(^[AS]: \d+((d\d+)?([+\-x](\d+|STR|DEX|CON|INT|WIS|CHA))?(\+PROF)?(\+LEV)?)$)/, 'i');
      return saveRegExp.test(value);
    }
    default: {
      return false;
    }
  }
};
