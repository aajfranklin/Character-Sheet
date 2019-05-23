import React from 'react';

function Button({clickHandler, label, icon, buttonStyle, disabled}) {

    return(
        <button type='button' className={buttonStyle} onClick={clickHandler}
                onMouseDown={(e) => {e.preventDefault()}} disabled={disabled}>
            <i key='icon' className={icon}/> {label}
        </button>
    );
}

export default Button;
