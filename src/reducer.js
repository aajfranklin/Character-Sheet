import { combineReducers } from 'redux';
import appReducer from './App/reducer';
import kiReducer from './App/pages/Ki/reducer';

export default combineReducers({
    app: appReducer,
    ki: kiReducer
});
