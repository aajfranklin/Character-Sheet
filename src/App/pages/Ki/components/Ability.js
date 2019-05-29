import React from 'react';
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
    updateAbility
} from '../actions/actionCreators';
import Button from '../../../components/Button/Button';

export function Ability({abilities, cancelEdit, deleteAbility, editAbility, index, saveAbility, updateAbility}) {

    function handleCancel() {
        cancelEdit(abilities[index].uuid);
    }

    function handleDelete() {
        deleteAbility(abilities[index], index);
    }

    function handleEdit() {
        editAbility(abilities[index].uuid);
    }

    function handleSave() {
        saveAbility(abilities[index]);
    }

    return(
        <tr className='entry'>
            { abilities[index].editing ?
                <React.Fragment>
                    <td className='col-2'><TextareaAutosize name='name' value={abilities[index].name} onChange={updateAbility}/></td>
                    <td className='col-1'><TextareaAutosize name='cost' value={abilities[index].cost} onChange={updateAbility}/></td>
                    <td className='col-2'><TextareaAutosize name='damage' value={abilities[index].damage} onChange={updateAbility}/></td>
                    <td className='col-1'><TextareaAutosize name='boost' value={abilities[index].boost} onChange={updateAbility}/></td>
                    <td className='col-2'><TextareaAutosize name='saving' value={abilities[index].saving} onChange={updateAbility}/></td>
                    <td className='col-6'><TextareaAutosize name='effect' value={abilities[index].effect} className='text-left' onChange={updateAbility}/></td>
                    <td className='col-1 button-group'>
                        <Button icon='fas fa-save' buttonStyle='clear flat' clickHandler={handleSave}/>
                        <Button icon='fas fa-times-circle' buttonStyle='clear flat delete' clickHandler={handleCancel}/>
                    </td>
                </React.Fragment>
                :
                <React.Fragment>
                    <td className='col-2'>{abilities[index].name}</td>
                    <td className='col-1'>{abilities[index].cost}</td>
                    <td className='col-2'>{abilities[index].damage}</td>
                    <td className='col-1'>{abilities[index].boost}</td>
                    <td className='col-2'>{abilities[index].saving}</td>
                    <td className='col-6 text-left'>{abilities[index].effect}</td>
                    <td className='col-1 button-group'>
                        <Button icon='fas fa-edit' buttonStyle='clear flat' clickHandler={handleEdit}/>
                        <Button icon='fas fa-trash' buttonStyle='clear flat delete' clickHandler={handleDelete}/>
                    </td>
                </React.Fragment>
            }
        </tr>
    );
}

function mapStateToProps(state) {
    return {
        abilities: state.ki.abilities,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        cancelEdit: (uuid) => {
            dispatch(revertAbility(uuid));
            dispatch(clearAbilityCache(uuid));
            dispatch(sortAbilities());
        },
        deleteAbility: (ability, index) => {
            dispatch(deleteAbility(ability, index));
        },
        editAbility: (uuid) => {
            dispatch(cacheAbility(uuid));
            dispatch(toggleEditAbility(uuid));
        },
        saveAbility: (ability) => {
            dispatch(saveAbility(ability));
        },
        updateAbility: (e) => {
            dispatch(updateAbility(e, ownProps.index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
