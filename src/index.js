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

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function reducer(state = { pages: pages }, action) {
    return state;
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById('root')
);
