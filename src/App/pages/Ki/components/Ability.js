import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {
    cacheAbility,
    clearAbilityCache,
    deleteAbility,
    revertAbility,
    toggleEditAbility,
    updateAbility
} from '../actions/actionCreators.js';
import Button from '../../../components/Button/Button.js';

function Ability({abilities, cancelEdit, deleteAbility, editAbility, id, saveAbility, updateAbility}) {
    const attributes = abilities[id];

    return(
        <div className='row entry'>
            { attributes.editing ?
                <React.Fragment>
                    <div className='col-2'><TextareaAutosize name='name' value={attributes.name} onChange={updateAbility}/></div>
                    <div className='col-1'><TextareaAutosize name='cost' value={attributes.cost} onChange={updateAbility}/></div>
                    <div className='col-2'><TextareaAutosize name='damage' value={attributes.damage} onChange={updateAbility}/></div>
                    <div className='col-1'><TextareaAutosize name='boost' value={attributes.boost} onChange={updateAbility}/></div>
                    <div className='col-2'><TextareaAutosize name='saving' value={attributes.saving} onChange={updateAbility}/></div>
                    <div className='col-6'><TextareaAutosize name='effect' value={attributes.effect} className='effect' onChange={updateAbility}/></div>
                    <div className='col-1 button-group'>
                        <Button icon='fas fa-save' buttonStyle='clear flat' clickHandler={saveAbility}/>
                        <Button icon='fas fa-times-circle' buttonStyle='clear flat delete' clickHandler={cancelEdit}/>
                    </div>

                </React.Fragment>
                :
                <React.Fragment>
                    <div className='col-2'>{attributes.name}</div>
                    <div className='col-1'>{attributes.cost}</div>
                    <div className='col-2'>{attributes.damage}</div>
                    <div className='col-1'>{attributes.boost}</div>
                    <div className='col-2'>{attributes.saving}</div>
                    <div className='col-6 effect'>{attributes.effect}</div>
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
          dispatch(revertAbility(ownProps.id));
          dispatch(clearAbilityCache(ownProps.id));
        },
        deleteAbility: () => {
            dispatch(deleteAbility(ownProps.id));
        },
        editAbility: () => {
            dispatch(cacheAbility(ownProps.id));
            dispatch(toggleEditAbility(ownProps.id));
        },
        saveAbility: () => {
            dispatch(clearAbilityCache(ownProps.id));
            dispatch(toggleEditAbility(ownProps.id));
        },
        updateAbility: (e) => {
            dispatch(updateAbility(e, ownProps.id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
