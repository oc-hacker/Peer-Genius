import React, { Component, PureComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';

import { connect } from 'react-redux';

import MasterRouter from './masterRouter';
import { UnexpectedErrorDialog } from './components';
import { muiTheme } from './style';

import store from '../redux/store';

/**
 * @classdesc A place where all kinds of providers reside.
 */
export default class Main extends Component {
	render() {
		return (
			<MuiThemeProvider theme={muiTheme}>
				<ReduxProvider store={store}>
					<div style={{ width: '100%', height: '100%' }}>
						<MasterRouter />
						<UnexpectedErrorDialog />
					</div>
				</ReduxProvider>
			</MuiThemeProvider>
		);
	}
}