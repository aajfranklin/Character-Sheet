import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  changeFormText, saveAbility, toggleAddAbilityForm, validateNewAbility,
} from '../actions/actionCreators';
import Button from '../../../components/Button/Button';

export function AbilityForm({
  handleFormChange, submitNewAbility, toggleForm, newAbility, isValid, validate,
}) {
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

  function disabled() {
    return Object.values(isValid).indexOf(false) >= 0
            || Object.values(isValid).length !== 6;
  }

  const invalidMessages = {
    textField: ' must not be left blank',
    numericField: ' must be numeric',
    diceField: ' must be a roll e.g. 1D6+WIS',
  };

  return (
    <form>
      <p className={invalid('name') ? 'invalid' : ''}>
        {`Name: ${invalid('name') ? invalidMessages.textField : ''}`}
        <textarea
          name="name"
          value={newAbility.name}
          placeholder={'What it\'s called...'}
          className="wide"
          onChange={handleFormChange}
          onBlur={validate}
        />
      </p>
      <div>
        <p className={`half-form-entry${invalid('cost') ? ' invalid' : ''}`}>
          {`Cost: ${invalid('cost') ? invalidMessages.numericField : ''}`}
          <textarea
            name="cost"
            value={newAbility.cost}
            placeholder="0"
            onChange={handleFormChange}
            onBlur={validate}
          />
        </p>
        <p className={`half-form-entry${invalid('damage') ? ' invalid' : ''}`}>
          {`Damage: ${invalid('damage') ? invalidMessages.diceField : ''}`}
          <textarea
            name="damage"
            value={newAbility.damage}
            placeholder="1D6"
            onChange={handleFormChange}
            onBlur={validate}
          />
        </p>
      </div>
      <div>
        <p className={`half-form-entry${invalid('boost') ? ' invalid' : ''}`}>
          {`Boost: ${invalid('boost') ? invalidMessages.diceField : ''}`}
          <textarea
            name="boost"
            value={newAbility.boost}
            placeholder="1D6"
            onChange={handleFormChange}
            onBlur={validate}
          />
        </p>
        <p className={`half-form-entry${invalid('saving') ? ' invalid' : ''}`}>
          {`Attack/Saving: ${invalid('saving') ? invalidMessages.diceField : ''}`}
          <textarea
            name="saving"
            value={newAbility.saving}
            placeholder="1D6"
            onChange={handleFormChange}
            onBlur={validate}
          />
        </p>
      </div>
      <p className={invalid('effect') ? 'invalid' : ''}>
        {`Effect: ${invalid('effect') ? invalidMessages.textField : ''}`}
        <textarea
          className="tall"
          name="effect"
          value={newAbility.effect}
          placeholder="What it does..."
          onChange={handleFormChange}
          onBlur={validate}
        />
      </p>
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
      dispatch(changeFormText(e));
      dispatch(validateNewAbility(e.target.name, e.target.value));
    },
    submitNewAbility: ability => dispatch(saveAbility(ability)),
    toggleForm: () => dispatch(toggleAddAbilityForm()),
    validate: e => dispatch(validateNewAbility(e.target.name, e.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityForm);