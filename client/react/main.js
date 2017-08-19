import React, { Component, PureComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';

import { connect } from 'react-redux';

import MasterRouter from './masterRouter';
import { muiTheme } from './theme';

import store from '../redux/store';

/**
 * @classdesc A place where all kinds of providers reside.
 */
export default class Main extends Component {
	render() {
		return (
			<MuiThemeProvider theme={muiTheme}>
				<ReduxProvider store={store}>
						<MasterRouter/>
				</ReduxProvider>
			</MuiThemeProvider>
		);
	}
}