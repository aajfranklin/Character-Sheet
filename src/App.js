import React from 'react';
import NavBar from './NavBar/NavBar';

function App(initialState) {
    return (
        <div className="App">
            <NavBar items={initialState.navBarItems}/>
        </div>
    );
}

export default App;
