import React from 'react';

function Button({clickHandler, label, icon, buttonStyle}) {

    return(
        <button className={'button ' + buttonStyle} onClick={() => {clickHandler()}}
            onMouseDown={(e) => {e.preventDefault()}}>
            <i key='icon' className={icon}/> {label}
        </button>
    );
}

export default Button;
