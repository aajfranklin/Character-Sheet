import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Ki from '../Pages/Ki.js';

function NavBar({pages}) {
    return(
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {pages.map((page) => {
                            return (
                                <li className="nav-item" key={page}>
                                    <Link className="nav-link" to={"/" + page}>{page}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
            <Route path="/Ki" exact component={Ki} />
        </Router>
    );
}

export default NavBar;
