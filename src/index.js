import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import App from './App';
import './index.css';

const pages = [
    'Stats',
    'Weapons',
    'Abilities',
    'Ki',
    'Lore',
    'Map'
];


const kiAbilities = [
    {
        index: 0,
        name: 'dummyName1',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    },
    {
        index: 1,
        name: 'dummyName2',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    },
    {
        index: 2,
        name: 'dummyName3',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    }
];

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function reducer(state = { pages: pages, kiAbilities: kiAbilities }, action) {
    return state;
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById('root')
);
