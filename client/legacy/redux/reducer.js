import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import comms from './reducers/comms';
import commMethods from './reducers/commMethods';
import inSession from './reducers/inSession';
import forms from './reducers/forms';
import fetching from './reducers/fetching';
import success from './reducers/success';
import userInfo from './reducers/userInfo';

// Create and export the main reducer from combining all sub-reducers.
const appReducer = combineReducers({
	comms,
	commMethods,
	inSession,
	fetching,
	success,
	forms,
	userInfo,
	routing,
	form: formReducer
});

export default appReducer;