import React from 'react';
import { connect } from 'react-redux';
import { DELETE_ABILITY } from '../../reducer/actionTypes';
import Button from '../../Button/Button.js';

function Ability({attributes, deleteAbility, id}) {
    return(
        <div className='row entry'>
            <div className='col-2'>{attributes.name}</div>
            <div className='col-1'>{attributes.cost}</div>
            <div className='col-1'>{attributes.damage}</div>
            <div className='col-2'>{attributes.saving}</div>
            <div className='col-5 effect'>{attributes.effect}</div>
            <div className='col-1 button-group'>
                <Button id='attributes.name' icon='fas fa-trash' buttonStyle='cancel' clickHandler={deleteAbility}/>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        deleteAbility: () => dispatch({ type: DELETE_ABILITY })
    }
}

export default connect(null, mapDispatchToProps)(Ability);
