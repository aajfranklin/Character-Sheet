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
    _useAbility,
    updateAbility,
    validateEdit
} from '../actions/actionCreators';
import Button from '../../../components/Button/Button';

export function Ability({ability, cancelEdit, deleteAbility, editAbility, index, saveAbility, useAbility, updateAbility, uuid, validate}) {

    function handleSave() {
        saveAbility(ability);
    }

    function invalid(attribute) {
        return ability.editValidation.hasOwnProperty(attribute)
            && !ability.editValidation[attribute];
    }

    function disabled() {
        return Object.values(ability.editValidation).indexOf(false) >= 0
            || Object.values(ability.editValidation).length === 0;
    }

    return(
        <tr className='entry'>
            { ability.editing ?
                <React.Fragment>
                    <td className='col-2'>
                        <TextareaAutosize
                            name='name' value={ability.name}
                            className={invalid('name') ? 'invalid' : ''}
                            onChange={updateAbility} onBlur={validate}/></td>
                    <td className='col-1'>
                        <TextareaAutosize
                            name='cost' value={ability.cost}
                            className={invalid('cost') ? 'invalid' : ''}
                            onChange={updateAbility} onBlur={validate}/></td>
                    <td className='col-1'>
                        <TextareaAutosize
                            name='damage' value={ability.damage}
                            className={invalid('damage') ? 'invalid' : ''}
                            onChange={updateAbility} onBlur={validate}/></td>
                    <td className='col-1'>
                        <TextareaAutosize
                            name='boost' value={ability.boost}
                            className={invalid('boost') ? 'invalid' : ''}
                            onChange={updateAbility} onBlur={validate}/></td>
                    <td className='col-2'>
                        <TextareaAutosize
                            name='saving' value={ability.saving}
                            className={invalid('saving') ? 'invalid' : ''}
                            onChange={updateAbility} onBlur={validate}/></td>
                    <td className='col-6'>
                        <TextareaAutosize
                            name='effect' value={ability.effect}
                            className={'text-left' + (invalid('effect') ? 'invalid' : '')}
                            onChange={updateAbility} onBlur={validate}/></td>
                    <td className='col-2 button-group'>
                        <Button icon='fas fa-dice-d20' buttonStyle='clear flat' clickHandler={()=>{}} disabled={true}/>
                        <Button icon='fas fa-save' buttonStyle='clear flat' clickHandler={handleSave} disabled={disabled()}/>
                        <Button icon='fas fa-times-circle' buttonStyle='clear flat delete' clickHandler={cancelEdit}/>
                    </td>
                </React.Fragment>
                :
                <React.Fragment>
                    <td className='col-2'>{ability.name}</td>
                    <td className='col-1'>{ability.cost}</td>
                    <td className='col-1'>{ability.damage}</td>
                    <td className='col-1'>{ability.boost}</td>
                    <td className='col-2'>{ability.saving}</td>
                    <td className='col-6 text-left'>{ability.effect}</td>
                    <td className='col-2 button-group'>
                        <Button icon='fas fa-dice-d20' buttonStyle='clear flat' clickHandler={useAbility}/>
                        <Button icon='fas fa-edit' buttonStyle='clear flat' clickHandler={editAbility}/>
                        <Button icon='fas fa-trash' buttonStyle='clear flat delete' clickHandler={deleteAbility}/>
                    </td>
                </React.Fragment>
            }
        </tr>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        ability: state.ki.abilities[ownProps.index],
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        cancelEdit: () => {
            dispatch(revertAbility(ownProps.uuid));
            dispatch(clearAbilityCache(ownProps.uuid));
            dispatch(sortAbilities());
        },
        deleteAbility: () => {
            dispatch(deleteAbility(ownProps.uuid, ownProps.index));
        },
        editAbility: () => {
            dispatch(cacheAbility(ownProps.uuid));
            dispatch(toggleEditAbility(ownProps.uuid));
        },
        saveAbility: (ability) => {
            dispatch(saveAbility(ability));
        },
        useAbility: () => {
            dispatch(_useAbility(ownProps.uuid));
        },
        updateAbility: (e) => {
            dispatch(updateAbility(e, ownProps.index));
            dispatch(validateEdit(e.target.name, e.target.value, ownProps.uuid));
        },
        validate: (e) => {
            dispatch(validateEdit(e.target.name, e.target.value, ownProps.uuid));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
