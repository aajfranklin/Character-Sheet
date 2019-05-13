import React from 'react';

function Button({clickHandler, label, icon, isLeftToRight}) {

    const iconElement = <i key='icon' className={icon}/>;

    return(
        <div className='button' onClick={() => {clickHandler()}}>
            {isLeftToRight ?
                [iconElement, ' ', label] :
                [label, ' ', iconElement]
            }
        </div>
    );
}

export default Button;
