import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import cookie from 'js-cookie';
import { routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import appReducer from './reducer.js';

export const browserHistory = createHistory();

const composeWithDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create and export the store with the initial structure.
let store = createStore(appReducer, {
	inSession: -1,
	fetching: false,
	success: {
		show: false,
		text: 'Success!'
	},
	forms: {},
	userInfo: {}
}, composeWithDevtools(
	applyMiddleware(
		// Use redux-thunk, react-router-redux, and redux-logger.
		thunkMiddleware,
		routerMiddleware(browserHistory),
		createLogger()
	)
));

export default store;