import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider, connect } from 'react-redux';
import { Route, Router, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../redux/store.js';

// MaterialUI Theme
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(baseTheme);

import AppBar from './AppBar.js';
import FrontPage from './frontPage.js';

import CreateAccount from './account/create.js';
import EditAccount from './account/edit.js';
import AccountSettings from './account.settings.js';

class App extends React.Component {
	// This is needed for MUI.
	static childContextTypes = {
		muiTheme: React.PropTypes.object.isRequired
	};

	constructor(props, context) {
		super(props, context);

		// This is needed for MUI.
		injectTapEventPlugin();
	}

	// This is needed for MUI.
	getChildContext = () => {
		return { muiTheme };
	}

	render() {
		if (this.props.inSession) {
			return (
				<div>
					<AppBar />

					{this.props.children}
				</div>
			)
		} else {
			return (
				<div>
					{this.props.children}
				</div>
			);
		}
	}
}

// Sync browser history with the store
let syncedHistory = syncHistoryWithStore(browserHistory, store);

/** Routes */
const routes = (
	<Provider store={store}>
		<Router history={syncedHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />

				<Route path="frontPage" component={FrontPage} />

				<Route path="account">
					<Route path="create" component={CreateAccount} />

					<Route path="edit" component={EditAccount} />

					<Route path="settings" component={AccountSettings} />
				</Route>
			</Route>
		</Router>
	</Provider>
);

// Render the app.
ReactDOM.render(routes, document.getElementById('app'));