import React from 'react';
import { connect } from 'react-redux';
import { changeFormText, submitNewAbility, toggleAddAbilityForm } from "../actions/actionCreators";
import Button from '../../../components/Button/Button';

function AbilityForm({handleFormChange, submitNewAbility, toggleAbilityForm, ...newAbility}) {
    return(
        <form>
            <p>Name:<input type='text' name='name' value={newAbility.name} onChange={handleFormChange}/></p>
            <p>Cost:<input type='text' name='cost' value={newAbility.cost} onChange={handleFormChange}/></p>
            <p>Damage:<input type='text' name='damage' value={newAbility.damage} onChange={handleFormChange}/></p>
            <p>Boost:<input type='text' name='damage' value={newAbility.boost} onChange={handleFormChange}/></p>
            <p>Saving Throw:<input type='text' name='saving' value={newAbility.saving} onChange={handleFormChange}/></p>
            <p>Effect:<input className='tall' type='text' name='effect' value={newAbility.effect} onChange={handleFormChange}/></p>
            <div className='button-group'>
                <Button clickHandler={submitNewAbility} label='SUBMIT' icon='fas fa-check-circle' buttonStyle='confirm'/>
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
        submitNewAbility: () => {
            dispatch(submitNewAbility());
            dispatch(toggleAddAbilityForm());
        },
        toggleAbilityForm: () => dispatch(toggleAddAbilityForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityForm)
