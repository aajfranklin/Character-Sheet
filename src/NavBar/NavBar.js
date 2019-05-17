import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Ki from '../Pages/Ki/Ki.js';
import './NavBar.css';

function NavBar({pages}) {
    return(
        <Router>
            <nav>
                {pages.map((page) => {
                    return (<Link className="nav-item" key={page} to={"/" + page}>{page}</Link>);
                })}
            </nav>
            <Route path="/Ki" exact component={Ki} />
        </Router>
    );
}

export default NavBar;
