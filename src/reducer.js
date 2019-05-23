import { combineReducers } from 'redux';
import appReducer from './App/reducer.js';
import kiReducer from './App/pages/Ki/reducer.js';

export default combineReducers({
    app: appReducer,
    ki: kiReducer
});
