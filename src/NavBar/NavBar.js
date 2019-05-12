import React from 'react';

function NavBar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Stats</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Rolls</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Abilities</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Ki</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Lore</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Map</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
