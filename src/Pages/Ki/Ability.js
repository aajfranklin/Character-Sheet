import React from "react";

function Ability({attributes}) {
    return(
        <div className='row entries' key={attributes.index}>
            <div className='col-2'>{attributes.name}</div>
            <div className='col-1'>{attributes.cost}</div>
            <div className='col-1'>{attributes.damage}</div>
            <div className='col-2'>{attributes.saving}</div>
            <div className='col-5 effect'>{attributes.effect}</div>
        </div>
    );
}

export default Ability;
