import React from 'react';
import ReactDOM from 'react-dom';
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
    console.log(state);
    return state;
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById('root')
);
