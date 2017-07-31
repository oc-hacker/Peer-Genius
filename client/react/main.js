import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import store, { browserHistory } from '../redux/store.js';
import { verifySession } from '../redux/actions/session.js';

// MaterialUI Theme
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme(baseTheme);

import AppRouter from './AppRouter.js';
import AppBar from './AppBar.js';

import Loading from './Loading.js';
import Success from './Success.js';

@connect(state => ({
	inSession: state.inSession
}), {
	verifySession
})
class App extends React.Component {
	// This is needed for MUI.
	static childContextTypes = {
		muiTheme: PropTypes.object.isRequired
	};
	
	// This is needed for MUI.
	getChildContext = () => {
		return { muiTheme };
	};
	
	componentWillMount() {
		if (this.props.inSession === -1) {
			this.props.verifySession(true);
		}
	}
	
	render() {
		return this.props.inSession === -1 ? (
			<div style={{ width: '100%', height: '100%' }}>
				<Loading />
				<Success />
			</div>
		) : (
			<div style={{ width: '100%', height: '100%' }}>
				<Loading />
				<Success />
				
				<AppRouter />
			</div>
		);
	}
}

/** Routes */
const MasterRouter = () => (
	<ConnectedRouter history={browserHistory}>
		<div style={{ width: '100vw', height: '100vh' }}>
			<Route path="/" component={App} />
		</div>
	</ConnectedRouter>
);

const Main = (
	<Provider store={store}>
		<div style={{ overflow: 'hidden' }}>
			<MasterRouter />
		</div>
	</Provider>
);

export default Main;