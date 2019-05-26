import React  from 'react';
import { connect } from 'react-redux';
import { fetchAbilities, toggleAddAbilityForm } from './actions/actionCreators'
import Ability from './components/Ability';
import AbilityForm from './components/AbilityForm';
import Button from '../../components/Button/Button';
import './Ki.css';
import '../../components/Button/Button.css';

function Ki({abilities, fetchAbilities, showAbilityForm, toggleAbilityForm}) {

    if (!abilities) {
        fetchAbilities();
        return null;
    }

    const meditate = () => {

    };

    return(
        <div>
            <div className='title-area'>
                <div className='title-half-left'>
                    <h1>Ki</h1>
                    <div>3 of 3 points available</div>
                </div>
                <div className='title-half-right'>
                    <Button clickHandler={meditate} label='MEDITATE' icon='fas fa-praying-hands'/>
                    <Button clickHandler={toggleAbilityForm} label='ADD ABILITY' icon='fas fa-plus-circle' disabled={showAbilityForm}/>
                </div>
            </div>
            {showAbilityForm ?
                <AbilityForm/>
                : null
            }
            <div>
                <div className='row labels'>
                    <div className='col-2'>Name</div>
                    <div className='col-1'>Cost</div>
                    <div className='col-2'>Damage</div>
                    <div className='col-1'>Boost</div>
                    <div className='col-2'>Saving Throw</div>
                    <div className='col-6'>Effect</div>
                </div>
                {
                    abilities.map((attributes, index) => {
                        return(<Ability key={index} id={index}/>);
                    })
                }
            </div>
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
        fetchAbilities: () => {dispatch(fetchAbilities())},
        toggleAbilityForm: () => dispatch(toggleAddAbilityForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ki);
