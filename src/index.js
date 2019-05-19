import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { initialState } from './model.js';
import App from './App.js';
import './index.css';

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        case 'TOGGLE_ABILITY_FORM':
            return update(state, {
                ki: { showAbilityForm: { $set: !state.ki.showAbilityForm } }
            });

        default:
            return state;
    }
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById('root')
);
