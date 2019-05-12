import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const state = {
    pages: [
        "Stats",
        "Rolls",
        "Abilities",
        "Ki",
        "Lore",
        "Map"
    ],
};

ReactDOM.render(<App {...state}/>, document.getElementById('root'));
