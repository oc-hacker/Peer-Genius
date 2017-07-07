import 'babel-polyfill';

import React from 'react';
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
		muiTheme: React.PropTypes.object.isRequired
	};
	
	// This is needed for MUI.
	getChildContext = () => {
		return {muiTheme};
	};

	componentWillMount() {
		if (this.props.inSession === -1) {
			this.props.verifySession();
		}
	}
	
	render() {
		return this.props.inSession === -1 ? (
			<div>
				<Loading />
				<Success />
			</div>
		) : (
			<div>
				<Loading />
				<Success />

				<AppBar />
				
				<AppRouter/>
			</div>
		);
	}
}

/** Routes */
const MasterRouter = () => (
	<ConnectedRouter history={browserHistory}>
		<div>
			<Route path="/" component={App}/>
		</div>
	</ConnectedRouter>
);

const Main = (
	<Provider store={store}>
		<MasterRouter/>
	</Provider>
);

export default Main;