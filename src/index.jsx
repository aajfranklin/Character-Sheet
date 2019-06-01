import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from './reducer';
import App from './App/App';
import './index.css';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;


const store = Redux.createStore(
  combineReducers,
  composeEnhancer(Redux.applyMiddleware(thunk)),
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>,
  document.getElementById('root'),
);
