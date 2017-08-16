import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const composeWithDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
	form: formReducer
}), {}, composeWithDevtools(
	applyMiddleware(logger)
));

export const withRedux = story => (
	<StoreProvider store={store}>
		{story()}
	</StoreProvider>
);

export const withTheme = story => (
	<MuiThemeProvider theme={createMuiTheme()}>
		{story()}
	</MuiThemeProvider>
);