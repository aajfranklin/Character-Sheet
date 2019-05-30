import React  from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { loadAbilities, toggleAddAbilityForm, restoreKi } from './actions/actionCreators'
import Ability from './components/Ability';
import AbilityForm from './components/AbilityForm';
import Button from '../../components/Button/Button';
import './Ki.css';
import '../../components/Button/Button.css';

export function Ki({abilities, available, loadAbilities, restoreKi, showAbilityForm, toggleAbilityForm, total}) {

    if (!abilities) {
        loadAbilities();
        return null;
    }

    return(
        <div>
            <div className='title-area'>
                <div className='title-half-left'>
                    <h1>Ki</h1>
                    <span>{available} of {total} points available</span>
                </div>
                <div className='title-half-right'>
                    <Button clickHandler={restoreKi} label='MEDITATE' icon='fas fa-praying-hands'/>
                    <Button clickHandler={toggleAbilityForm} label='ADD ABILITY' icon='fas fa-plus-circle' disabled={showAbilityForm}/>
                </div>
            </div>
            <CSSTransition in={showAbilityForm} mountOnEnter={true} unmountOnExit={true} classNames='slide-down' timeout={200}>
                <AbilityForm/>
            </CSSTransition>
            <table rules='none'>
                <tbody>
                    <tr className='labels'>
                        <th className='col-2'>Name</th>
                        <th className='col-1'>Cost</th>
                        <th className='col-1'>Damage</th>
                        <th className='col-1'>Boost</th>
                        <th className='col-2'>Attack/Saving</th>
                        <th className='col-6'>Effect</th>
                    </tr>
                    {
                        abilities.map((attributes, index) => {
                            return(<Ability key={index} index={index} uuid={abilities[index].uuid} available={available}/>);
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        abilities: state.ki.abilities,
        available: state.ki.available,
        showAbilityForm: state.ki.showAbilityForm,
        total: state.ki.total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadAbilities: () => dispatch(loadAbilities()),
        toggleAbilityForm: () => dispatch(toggleAddAbilityForm()),
        restoreKi: () => dispatch(restoreKi())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ki);
