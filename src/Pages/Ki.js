import React from 'react';
import Button from '../Button/Button.js';
import './Page.css';
import '../Button/Button.css';

const kiAbilities = [
    {
        index: 0,
        name: 'dummyName1',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    },
    {
        index: 1,
        name: 'dummyName2',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    },
    {
        index: 2,
        name: 'dummyName3',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    }
];

function Ki() {
    return(
        <div>
            <div className='title-area'>
                <div className='title-half-left'>
                    <h1>Ki</h1>
                    <div>3 of 3 points available</div>
                </div>
                <div className='title-half-right'>
                    <Button clickHandler={addAbility} label='ADD ABILITY' icon='fas fa-plus-circle' isLeftToRight={false}/>
                    <Button clickHandler={meditate} label='MEDITATE' icon='fas fa-praying-hands' isLeftToRight={false}/>
                </div>
            </div>
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

export const addAbility = () => {

};

export const meditate = () => {

};

export default Ki;
