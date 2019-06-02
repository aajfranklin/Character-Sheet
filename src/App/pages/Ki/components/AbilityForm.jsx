import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  updateNewAbility, saveAbility, toggleAddAbilityForm, validateNewAbility,
} from '../actions/actionCreators';
import Button from '../../../components/Button/Button';

export function AbilityForm({
  handleFormChange, submitNewAbility, toggleForm, newAbility, isValid, validate,
}) {
  function disabled() {
    return Object.values(isValid).indexOf(false) >= 0
            || Object.values(isValid).length !== 6;
  }

  function handleSubmit() {
    const ability = { ...newAbility };
    ability.uuid = uuid();
    ability.isNew = true;
    submitNewAbility(ability);
  }

  function invalid(attribute) {
    return Object.prototype.hasOwnProperty.call(isValid, attribute)
      && !isValid[attribute];
  }

  const invalidMessages = {
    text: ' must not be left blank',
    numeric: ' must be numeric',
    dice: ' must be a roll e.g. 1D6+WIS',
  };

  function formField(attribute, displayName, fieldType, pClass, placeholder, textAreaClass) {
    return (
      <p className={pClass + (invalid(attribute) ? ' invalid' : '')}>
        {`${displayName + (invalid(attribute) ? invalidMessages[fieldType] : '')}`}
        <textarea
          name={attribute}
          value={newAbility[attribute]}
          placeholder={placeholder}
          className={textAreaClass}
          onChange={handleFormChange}
          onBlur={validate}
        />
      </p>
    );
  }

  return (
    <form>
      {formField('name', 'Name:', 'text', '', 'What it\'s called...', 'wide')}
      <div>
        {formField('cost', 'Cost:', 'numeric', 'half-form-entry', '0', '')}
        {formField('damage', 'Damage:', 'dice', 'half-form-entry', '1d6', '')}
      </div>
      <div>
        {formField('boost', 'Boost:', 'dice', 'half-form-entry', '1d6', '')}
        {formField('saving', 'Attack/Saving:', 'dice', 'half-form-entry', 'A/S: 1d6', '')}
      </div>
      {formField('effect', 'Effect:', 'text', '', 'What it does...', 'tall')}
      <div className="button-group">
        <Button
          clickHandler={handleSubmit}
          label="SUBMIT"
          icon="fas fa-check-circle"
          buttonStyle="confirm"
          disabled={disabled()}
        />
        <Button clickHandler={toggleForm} label="CANCEL" icon="fas fa-times-circle" buttonStyle="cancel" />
      </div>
    </form>
  );
}

AbilityForm.propTypes = {
  handleFormChange: PropTypes.func.isRequired,
  submitNewAbility: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  newAbility: PropTypes.objectOf(PropTypes.string),
  isValid: PropTypes.objectOf(PropTypes.bool),
  validate: PropTypes.func.isRequired,
};

AbilityForm.defaultProps = {
  newAbility: null,
  isValid: {},
};

function mapStateToProps(state) {
  return {
    newAbility: state.ki.newAbility,
    isValid: state.ki.abilityFormValidation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleFormChange: (e) => {
      dispatch(updateNewAbility(e));
      dispatch(validateNewAbility(e.target.name, e.target.value));
    },
    submitNewAbility: ability => dispatch(saveAbility(ability)),
    toggleForm: () => dispatch(toggleAddAbilityForm()),
    validate: e => dispatch(validateNewAbility(e.target.name, e.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityForm);
