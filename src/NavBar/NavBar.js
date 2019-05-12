import React from 'react';

function NavBar({items}) {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {items.map((item) => {
                        return (
                            <li className="nav-item" key={item}>
                                <a className="nav-link" href="#">{item}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
