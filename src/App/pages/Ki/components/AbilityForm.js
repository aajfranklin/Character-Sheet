import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { changeFormText, submitNewAbility, toggleAddAbilityForm, validateNewAbility } from "../actions/actionCreators";
import Button from '../../../components/Button/Button';

export function AbilityForm({handleFormChange, submitNewAbility, toggleAbilityForm, newAbility, isValid, validate}) {

    function handleSubmit() {
        const ability = {...newAbility};
        ability.uuid = uuid();
        submitNewAbility(ability);
    }

    return(
        <form>
            <p className={isValid.name ? '' : 'invalid'}>
                {'Name: ' + (isValid.name ? '' : invalidMessages.textField)}
                <textarea className='wide' name='name' value={newAbility.name} placeholder={'What it\'s called...'}
                          onChange={handleFormChange} onBlur={validate}/>
            </p>
            <div>
                <p className={'half-form-entry' + (isValid.cost ? '' : ' invalid')}>
                    {'Cost: ' + (isValid.cost ? '' : invalidMessages.numericField)}
                    <textarea name='cost' value={newAbility.cost}  placeholder='0'
                              onChange={handleFormChange} onBlur={validate}/>
                </p>
                <p className={'half-form-entry' + (isValid.damage ? '' : ' invalid')}>
                    {'Damage: ' + (isValid.damage ? '' : invalidMessages.diceField)}
                    <textarea name='damage' value={newAbility.damage}  placeholder='1D6'
                              onChange={handleFormChange} onBlur={validate}/>
                </p>
            </div>
            <div>
                <p className={'half-form-entry' + (isValid.boost ? '' : ' invalid')}>
                    {'Boost: ' + (isValid.boost ? '' : invalidMessages.diceField)}
                    <textarea name='boost' value={newAbility.boost}  placeholder='1D6'
                              onChange={handleFormChange} onBlur={validate}/>
                </p>
                <p className={'half-form-entry' + (isValid.saving ? '' : ' invalid')}>
                    {'Saving throw: ' + (isValid.saving ? '' : invalidMessages.diceField)}
                    <textarea name='saving' value={newAbility.saving}  placeholder='1D6'
                              onChange={handleFormChange} onBlur={validate}/>
                </p>
            </div>
            <p className={isValid.effect ? '' : 'invalid'}>
                {'Effect: ' + (isValid.effect ? '' : invalidMessages.textField)}
                <textarea className='tall' name='effect' value={newAbility.effect} placeholder='What it does...'
                          onChange={handleFormChange} onBlur={validate}/>
            </p>
            <div className='button-group'>
                <Button clickHandler={handleSubmit} label='SUBMIT' icon='fas fa-check-circle' buttonStyle='confirm'
                        disabled={Object.values(isValid).indexOf(false) >= 0 || Object.values(newAbility).indexOf('') >= 0}/>
                <Button clickHandler={toggleAbilityForm} label='CANCEL' icon='fas fa-times-circle' buttonStyle='cancel'/>
            </div>
        </form>
    );
}

const invalidMessages = {
    textField: ' must not be left blank',
    numericField: ' must be numeric',
    diceField: ' must be a roll e.g. 1D6+WIS'
};

function mapStateToProps(state) {
    return {
        newAbility: state.ki.newAbility,
        isValid: state.ki.abilityFormValidation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleFormChange: (e) => dispatch(changeFormText(e)),
        submitNewAbility: (ability) => dispatch(submitNewAbility(ability)),
        toggleAbilityForm: () => dispatch(toggleAddAbilityForm()),
        validate: (e) => dispatch(validateNewAbility(e.target.name, e.target.value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityForm)
