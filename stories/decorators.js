import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from '../client/react/theme';

import store from '../client/redux/store';

export const withRedux = story => (
	<StoreProvider store={store}>
		{story()}
	</StoreProvider>
);

export const withTheme = story => (
	<MuiThemeProvider theme={theme}>
		{story()}
	</MuiThemeProvider>
);