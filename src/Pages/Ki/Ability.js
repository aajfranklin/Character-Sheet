import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {CACHE_ABILITY, CLEAR_ABILITY_CACHE, DELETE_ABILITY,
    REVERT_ABILITY, TOGGLE_EDIT_ABILITY, UPDATE_ABILITY}
    from '../../reducer/actionTypes';
import Button from '../../Button/Button.js';

function Ability({abilities, cancelEdit, deleteAbility, editAbility, id, saveAbility, updateAbility}) {
    const attributes = abilities[id];

    return(
        <div className='row entry'>
            { attributes.editing ?
                <React.Fragment>
                    <div className='col-2'><TextareaAutosize name='name' value={attributes.name} onChange={updateAbility}/></div>
                    <div className='col-1'><TextareaAutosize name='cost' value={attributes.cost} onChange={updateAbility}/></div>
                    <div className='col-1'><TextareaAutosize name='damage' value={attributes.damage} onChange={updateAbility}/></div>
                    <div className='col-2'><TextareaAutosize name='saving' value={attributes.saving} onChange={updateAbility}/></div>
                    <div className='col-5'><TextareaAutosize name='effect' value={attributes.effect} className='effect' onChange={updateAbility}/></div>
                    <div className='col-1 button-group'>
                        <Button icon='fas fa-save' buttonStyle='clear flat' clickHandler={saveAbility}/>
                        <Button icon='fas fa-times-circle' buttonStyle='clear flat delete' clickHandler={cancelEdit}/>
                    </div>

                </React.Fragment>
                :
                <React.Fragment>
                    <div className='col-2'>{attributes.name}</div>
                    <div className='col-1'>{attributes.cost}</div>
                    <div className='col-1'>{attributes.damage}</div>
                    <div className='col-2'>{attributes.saving}</div>
                    <div className='col-5 effect'>{attributes.effect}</div>
                    <div className='col-1 button-group'>
                        <Button icon='fas fa-edit' buttonStyle='clear flat' clickHandler={editAbility}/>
                        <Button icon='fas fa-trash' buttonStyle='clear flat delete' clickHandler={deleteAbility}/>
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        abilities: state.ki.abilities,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        cancelEdit: () => {
          dispatch({ type: REVERT_ABILITY, id: ownProps.id });
          dispatch({ type: CLEAR_ABILITY_CACHE, id: ownProps.id });
        },
        deleteAbility: () => {
            dispatch({type: DELETE_ABILITY, id: ownProps.id})
        },
        editAbility: () => {
            dispatch({ type: CACHE_ABILITY, id: ownProps.id });
            dispatch({ type: TOGGLE_EDIT_ABILITY, id: ownProps.id })
        },
        saveAbility: () => {
            dispatch({ type: CLEAR_ABILITY_CACHE, id: ownProps.id });
            dispatch({ type: TOGGLE_EDIT_ABILITY, id: ownProps.id });
        },
        updateAbility: (e) => {
            dispatch({ type: UPDATE_ABILITY, event: e, id: ownProps.id });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
