import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';

import inSession from './reducers/inSession.js';
import forms from './reducers/forms.js';
import fetching from './reducers/fetching.js';
import success from './reducers/success.js';
import userInfo from './reducers/userInfo.js';

// Create and export the main reducer from combining all sub-reducers.
const appReducer = combineReducers({
	inSession,
	fetching,
	success,
	forms,
	userInfo,
	routing
});

export default appReducer;