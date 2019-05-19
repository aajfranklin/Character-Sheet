import React from "react";
import { connect } from 'react-redux';
import { TOGGLE_ABILITY_FORM } from "../../reducer/actionTypes";
import Button from "../../Button/Button";

function AbilityForm({toggleAbilityForm}) {
    return(
        <form>
            <p>Name:<input type='text' name='name' /></p>
            <p>Cost:<input type='text' name='cost' /></p>
            <p>Damage:<input type='text' name='damage' /></p>
            <p>Saving Throw:<input type='text' name='saving' /></p>
            <p>Effect:<input className='tall' type='text' name='effect' /></p>
            <div className='button-group'>
                <Button clickHandler={toggleAbilityForm} label='SUBMIT' icon='fas fa-check-circle' buttonStyle='confirm'/>
                <Button clickHandler={toggleAbilityForm} label='CANCEL' icon='fas fa-times-circle' buttonStyle='cancel'/>
            </div>
        </form>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        toggleAbilityForm: () => dispatch({ type: TOGGLE_ABILITY_FORM })
    }
}

export default connect(null, mapDispatchToProps)(AbilityForm)
