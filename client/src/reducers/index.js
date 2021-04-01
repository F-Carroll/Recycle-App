import counterReducer from './counter';
import {combineReducers} from 'redux';
import queryReducer from './query';
import itemsReducer from './items'
import selectedLocationReducer from './selectedlocation';

const allReducers = combineReducers({
    counter: counterReducer,
    query: queryReducer,
    items: itemsReducer,
    selectedLocation: selectedLocationReducer
});

export default allReducers;