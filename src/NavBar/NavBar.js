import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({pages}) {
    return(
        <nav>
            {pages.map((page) => {
                return (<Link className='nav-item' key={page} to={'/' + page}>{page}</Link>);
            })}
        </nav>
    );
}

export default NavBar;
