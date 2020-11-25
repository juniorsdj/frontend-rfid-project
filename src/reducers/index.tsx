import { combineReducers } from 'redux';
import systemReducer from './systemReducers'

export default combineReducers({
    system: systemReducer
});


