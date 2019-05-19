import React  from 'react';
import { connect } from 'react-redux';
import AbilityForm from './AbilityForm.js';
import Button from '../../Button/Button.js';
import './Ki.css';
import '../../Button/Button.css';

function Ki({abilities, showAbilityForm, toggleAbilityForm}) {

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
                    <Button clickHandler={toggleAbilityForm} label='ADD ABILITY' icon='fas fa-plus-circle'/>
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
                    <div className='col-1'>Damage</div>
                    <div className='col-2'>Saving Throw</div>
                    <div className='col-5'>Effect</div>
                </div>
                {
                    abilities.map((data) => {
                        return(
                            <div className='row entries' key={data.index}>
                                <div className='col-2'>{data.name}</div>
                                <div className='col-1'>{data.cost}</div>
                                <div className='col-1'>{data.damage}</div>
                                <div className='col-2'>{data.saving}</div>
                                <div className='col-5 effect'>{data.effect}</div>
                            </div>
                        );
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
        toggleAbilityForm: () => dispatch({ type: 'TOGGLE_ABILITY_FORM' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ki);
