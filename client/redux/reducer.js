import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';

import forms from './reducers/forms.js';
import fetching from './reducers/fetching.js';
import success from './reducers/success.js';

// Create and export the main reducer from combining all sub-reducers.
const appReducer = combineReducers({
	forms,
	fetching,
	success,
	routing
});

export default appReducer;