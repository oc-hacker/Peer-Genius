import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import { muiTheme } from '../client/react/style';

import store from '../client/redux/store';

export const withRedux = story => (
    <StoreProvider store={store}>
        {story()}
    </StoreProvider>
);

console.log(muiTheme)
export const withTheme = story => (
    <MuiThemeProvider theme={muiTheme}>
        {story()}
    </MuiThemeProvider>
);