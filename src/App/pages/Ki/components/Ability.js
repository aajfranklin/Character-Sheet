import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {
    cacheAbility,
    clearAbilityCache,
    deleteAbility,
    revertAbility,
    saveAbility,
    toggleEditAbility,
    updateAbility
} from '../actions/actionCreators';
import Button from '../../../components/Button/Button';

export function Ability({abilities, cancelEdit, deleteAbility, editAbility, id, saveAbility, updateAbility}) {

    function handleDelete(){
        const ability = abilities[id];
        ability.id = id;
        deleteAbility(ability);
    }

    function handleSave() {
        // const ability = abilities[id];
        // ability.id = id;
        saveAbility(abilities[id], id);
    }

    return(
        <div className='row entry'>
            { abilities[id].editing ?
                <React.Fragment>
                    <div className='col-2'><TextareaAutosize name='name' value={abilities[id].name} onChange={updateAbility}/></div>
                    <div className='col-1'><TextareaAutosize name='cost' value={abilities[id].cost} onChange={updateAbility}/></div>
                    <div className='col-2'><TextareaAutosize name='damage' value={abilities[id].damage} onChange={updateAbility}/></div>
                    <div className='col-1'><TextareaAutosize name='boost' value={abilities[id].boost} onChange={updateAbility}/></div>
                    <div className='col-2'><TextareaAutosize name='saving' value={abilities[id].saving} onChange={updateAbility}/></div>
                    <div className='col-6'><TextareaAutosize name='effect' value={abilities[id].effect} className='effect' onChange={updateAbility}/></div>
                    <div className='col-1 button-group'>
                        <Button icon='fas fa-save' buttonStyle='clear flat' clickHandler={handleSave}/>
                        <Button icon='fas fa-times-circle' buttonStyle='clear flat delete' clickHandler={cancelEdit}/>
                    </div>

                </React.Fragment>
                :
                <React.Fragment>
                    <div className='col-2'>{abilities[id].name}</div>
                    <div className='col-1'>{abilities[id].cost}</div>
                    <div className='col-2'>{abilities[id].damage}</div>
                    <div className='col-1'>{abilities[id].boost}</div>
                    <div className='col-2'>{abilities[id].saving}</div>
                    <div className='col-6 effect'>{abilities[id].effect}</div>
                    <div className='col-1 button-group'>
                        <Button icon='fas fa-edit' buttonStyle='clear flat' clickHandler={editAbility}/>
                        <Button icon='fas fa-trash' buttonStyle='clear flat delete' clickHandler={handleDelete}/>
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
        deleteAbility: (ability) => {
            dispatch(deleteAbility(ability));
        },
        editAbility: () => {
            dispatch(cacheAbility(ownProps.id));
            dispatch(toggleEditAbility(ownProps.id));
        },
        saveAbility: (ability, id) => {
            dispatch(saveAbility(ability, id));
        },
        updateAbility: (e) => {
            dispatch(updateAbility(e, ownProps.id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
