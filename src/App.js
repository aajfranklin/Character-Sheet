import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Ki from './Pages/Ki/Ki.js';
import './App.css';

function App(initialState) {
    return (
        <div className='App'>
            <Router>
                <nav>
                    {initialState.pages.map((page) => {
                        return (<Link className='nav-item' key={page} to={'/' + page}>{page}</Link>);
                    })}
                </nav>
                <main>
                    <Route path='/Ki' component={Ki} />
                </main>
            </Router>
        </div>
    );
}

export default App;
