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
import Home from './home.js';

import CreateAccount from './account/create.js';
import EditAccount from './account/edit.js';
import AccountSettings from './account/settings.js';

const style = {
	content: {
		height: '100%',
		paddingTop: 64,
		textAlight: 'center'
	}
}

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
		return (
			<div>
				<AppBar />

				<div style={style.content}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

// Sync browser history with the store
let syncedHistory = syncHistoryWithStore(browserHistory, store);

/** Routes */
const routes = (
	<Provider store={store}>
		<Router history={syncedHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={FrontPage} />

				<Route path="home" component={Home} />

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