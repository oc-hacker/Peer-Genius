import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapPlugin from 'react-tap-event-plugin';

const composeWithDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
	form: formReducer
}), {}, composeWithDevtools(
	applyMiddleware()
));

export const withRedux = story => (
	<StoreProvider store={store}>
		{story()}
	</StoreProvider>
);

injectTapPlugin();
export const withTheme = story => (
	<ThemeProvider>
		{story()}
	</ThemeProvider>
);