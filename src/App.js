import React from 'react';
import NavBar from './NavBar/NavBar';

function App(initialState) {
    return (
        <div className="App">
            <NavBar pages={initialState.pages}/>
        </div>
    );
}

export default App;
