import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar.js'
import Ki from './Pages/Ki/Ki.js';

function App(initialState) {
    return (
        <div className='App'>
            <Router>
                <NavBar pages={initialState.pages}/>
                <main>
                    <Route path='/Ki' component={Ki} />
                </main>
            </Router>
        </div>
    );
}

export default App;
