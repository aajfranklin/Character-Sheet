import React  from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { loadAbilities, toggleAddAbilityForm } from './actions/actionCreators'
import Ability from './components/Ability';
import AbilityForm from './components/AbilityForm';
import Button from '../../components/Button/Button';
import './Ki.css';
import '../../components/Button/Button.css';

export function Ki({abilities, loadAbilities, showAbilityForm, toggleAbilityForm}) {

    if (!abilities) {
        loadAbilities();
        return null;
    }

    const meditate = () => {

    };

    return(
        <div>
            <div className='title-area'>
                <div className='title-half-left'>
                    <h1>Ki</h1>
                    <span>3 of 3 points available</span>
                </div>
                <div className='title-half-right'>
                    <Button clickHandler={meditate} label='MEDITATE' icon='fas fa-praying-hands'/>
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
                        <th className='col-2'>Saving Throw</th>
                        <th className='col-6'>Effect</th>
                    </tr>
                    {
                        abilities.map((attributes, index) => {
                            return(<Ability key={index} index={index} uuid={abilities[index].uuid}/>);
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
        showAbilityForm: state.ki.showAbilityForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadAbilities: () => {dispatch(loadAbilities())},
        toggleAbilityForm: () => dispatch(toggleAddAbilityForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ki);
