import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';

import appReducer from './reducer.js';

// Create and export the store with the initial structure.
let store = createStore(appReducer, {
	
}, applyMiddleware(
	// Use redux-thunk, react-router-redux, and redux-logger.
	thunkMiddleware,
	routerMiddleware(browserHistory),
	createLogger()
));

export default store;