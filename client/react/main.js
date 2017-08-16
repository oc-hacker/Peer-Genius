import React, { Component, PureComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from 'material-ui';

import { connect } from 'react-redux';

import MasterRouter from './router';
import { muiTheme } from './theme';

import store, { browserHistory } from '../redux/store';
import { initialize } from '../redux/actions/creators/init';

/**
 * @classdesc A place where all kinds of providers reside.
 */
export default class Main extends Component {
	render() {
		return (
			<MuiThemeProvider theme={muiTheme}>
				<ReduxProvider store={store}>
					<ConnectedRouter history={browserHistory}>
						<MasterRouter />
					</ConnectedRouter>
				</ReduxProvider>
			</MuiThemeProvider>
		);
	}
}