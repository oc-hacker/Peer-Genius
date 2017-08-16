import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { reducer as formReducer } from 'redux-form';

import * as reducers from './reducers';
import { standardize } from './middlewares';

// import appReducer from './reducer.js';

export const browserHistory = createHistory();

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create and export the store with the initial structure.
let store = createStore(
	combineReducers({
		...reducers,
		form: formReducer
	}),
	{},
	composeWithDevTools(
		applyMiddleware(
			standardize,
			thunkMiddleware,
			routerMiddleware(browserHistory),
		)
	)
);

export default store;