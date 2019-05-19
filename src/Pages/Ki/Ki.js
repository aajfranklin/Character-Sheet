import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../Button/Button.js';
import './Ki.css';
import '../../Button/Button.css';

function Ki({kiAbilities}) {

    const [showAbilityForm, setShowAbilityForm] = useState(false);

    const toggleAbilityForm = () => {
        showAbilityForm ?
            setShowAbilityForm(false) :
            setShowAbilityForm(true)
    };

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
                <form>
                    <p>Name:<input type='text' name='name' /></p>
                    <p>Cost:<input type='text' name='cost' /></p>
                    <p>Damage:<input type='text' name='damage' /></p>
                    <p>Saving Throw:<input type='text' name='saving' /></p>
                    <p>Effect:<input className='tall' type='text' name='effect' /></p>
                    <div className='button-group'>
                        <Button clickHandler={toggleAbilityForm} label='SUBMIT' icon='fas fa-check-circle' buttonStyle='confirm'/>
                        <Button clickHandler={toggleAbilityForm} label='CANCEL' icon='fas fa-times-circle' buttonStyle='cancel'/>
                    </div>
                </form>
                : null
            }
            <div className='row labels'>
                <div className='col-2'>Name</div>
                <div className='col-1'>Cost</div>
                <div className='col-1'>Damage</div>
                <div className='col-2'>Saving Throw</div>
                <div className='col-5'>Effect</div>
            </div>
            {
                kiAbilities.map((data) => {
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
    );
}

function mapStateToProps(state) {
    return {
        kiAbilities: state.kiAbilities
    }
}

export default connect(mapStateToProps)(Ki);
