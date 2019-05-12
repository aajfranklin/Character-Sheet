import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

const state = {
    navBarItems: [
        "Stats",
        "Rolls",
        "Abilities",
        "Ki",
        "Lore",
        "Map"
    ],
    whatever: 1,
    another: 2
};

ReactDOM.render(<App {...state}/>, document.getElementById('root'));
