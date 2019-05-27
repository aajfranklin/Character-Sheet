import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';
import { changeFormText, submitNewAbility, toggleAddAbilityForm } from "../actions/actionCreators";
import Button from '../../../components/Button/Button';

export function AbilityForm({handleFormChange, submitNewAbility, toggleAbilityForm, newAbility}) {

    function handleSubmit() {
        const ability = {...newAbility};
        ability.uuid = uuid();
        submitNewAbility(ability);
    }

    return(
        <form>
            <p>Name: <TextareaAutosize name='name' value={newAbility.name} onChange={handleFormChange}/></p>
            <p>Cost: <TextareaAutosize name='cost' value={newAbility.cost} onChange={handleFormChange}/></p>
            <p>Damage: <TextareaAutosize name='damage' value={newAbility.damage} onChange={handleFormChange}/></p>
            <p>Boost: <TextareaAutosize name='boost' value={newAbility.boost} onChange={handleFormChange}/></p>
            <p>Saving Throw: <TextareaAutosize name='saving' value={newAbility.saving} onChange={handleFormChange}/></p>
            <p>Effect: <TextareaAutosize name='effect' value={newAbility.effect} onChange={handleFormChange}/></p>
            <div className='button-group'>
                <Button clickHandler={handleSubmit} label='SUBMIT' icon='fas fa-check-circle' buttonStyle='confirm'/>
                <Button clickHandler={toggleAbilityForm} label='CANCEL' icon='fas fa-times-circle' buttonStyle='cancel'/>
            </div>
        </form>
    );
}

function mapStateToProps(state) {
    return {
        newAbility: state.ki.newAbility
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleFormChange: (e) => dispatch(changeFormText(e)),
        submitNewAbility: (ability) => dispatch(submitNewAbility(ability)),
        toggleAbilityForm: () => dispatch(toggleAddAbilityForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityForm)
