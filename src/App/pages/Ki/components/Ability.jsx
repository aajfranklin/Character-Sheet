import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {
  cacheAbility,
  clearAbilityCache,
  deleteAbility,
  revertAbility,
  saveAbility,
  sortAbilities,
  toggleEditAbility,
  updateAbility,
  validateEdit,
} from '../actions/actionCreators';
import { updateStat } from '../../../actions/actionCreators';
import Button from '../../../components/Button/Button';

export function Ability({
  ability, available, cancelEdit, deleteThisAbility, editAbility,
  // eslint-disable-next-line no-unused-vars
  index, save, update, updateKiAvailable, uuid, validate,
}) {
  function handleSave() {
    save(ability);
  }

  function handleUseAbility() {
    if (ability.cost > 0) updateKiAvailable(available - ability.cost);
  }

  function invalid(attribute) {
    return Object.prototype.hasOwnProperty.call(ability.editValidation, attribute)
            && !ability.editValidation[attribute];
  }

  function disabled() {
    return Object.values(ability.editValidation).indexOf(false) >= 0
            || Object.values(ability.editValidation).length === 0;
  }

  function abilityEditField(attribute, columnWidth, textAlign) {
    return (
      <td className={`col-${columnWidth}`}>
        <TextareaAutosize
          name={attribute}
          value={ability[attribute]}
          className={textAlign + (invalid(attribute) ? 'invalid' : '')}
          onChange={update}
          onBlur={validate}
        />
      </td>
    );
  }

  return (
    <tr className="entry">
      { ability.editing
        ? (
          <React.Fragment>
            {abilityEditField('name', '2', '')}
            {abilityEditField('cost', '1', '')}
            {abilityEditField('damage', '1', '')}
            {abilityEditField('boost', '1', '')}
            {abilityEditField('saving', '2', '')}
            {abilityEditField('effect', '6', 'text-left')}
            <td className="col-2 button-group">
              <Button icon="fas fa-dice-d20" buttonStyle="clear flat" clickHandler={() => {}} disabled />
              <Button icon="fas fa-save" buttonStyle="clear flat" clickHandler={handleSave} disabled={disabled()} />
              <Button icon="fas fa-times-circle" buttonStyle="clear flat delete" clickHandler={cancelEdit} />
            </td>
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <td className="col-2">{ability.name}</td>
            <td className="col-1">{ability.cost}</td>
            <td className="col-1">{ability.damage}</td>
            <td className="col-1">{ability.boost}</td>
            <td className="col-2">{ability.saving}</td>
            <td className="col-6 text-left">{ability.effect}</td>
            <td className="col-2 button-group">
              <Button icon="fas fa-dice-d20" buttonStyle="clear flat" clickHandler={handleUseAbility} disabled={ability.cost > available} />
              <Button icon="fas fa-edit" buttonStyle="clear flat" clickHandler={editAbility} />
              <Button icon="fas fa-trash" buttonStyle="clear flat delete" clickHandler={deleteThisAbility} />
            </td>
          </React.Fragment>
        )
            }
    </tr>
  );
}

Ability.propTypes = {
  ability: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  available: PropTypes.number.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteThisAbility: PropTypes.func.isRequired,
  editAbility: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  updateKiAvailable: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    ability: state.ki.abilities[ownProps.index],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancelEdit: () => {
      dispatch(revertAbility(ownProps.uuid));
      dispatch(clearAbilityCache(ownProps.uuid));
      dispatch(sortAbilities());
    },
    deleteThisAbility: () => {
      dispatch(deleteAbility(ownProps.uuid, ownProps.index));
    },
    editAbility: () => {
      dispatch(cacheAbility(ownProps.uuid));
      dispatch(toggleEditAbility(ownProps.uuid));
    },
    save: (ability) => {
      dispatch(saveAbility(ability));
    },
    updateKiAvailable: (value) => {
      dispatch(updateStat('kiAvailable', value));
    },
    update: (e) => {
      dispatch(updateAbility(e, ownProps.index));
      dispatch(validateEdit(e.target.name, e.target.value, ownProps.uuid));
    },
    validate: (e) => {
      dispatch(validateEdit(e.target.name, e.target.value, ownProps.uuid));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
