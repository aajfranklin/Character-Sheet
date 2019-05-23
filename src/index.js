import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import combineReducers from './reducer.js';
import App from './App/App.js';
import './index.css';

let store = Redux.createStore(
    combineReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById('root')
);
