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
				<p>Hello World!</p>
			</div>
		);

	}
}

// Sync browser history with the store
let syncedHistory = syncHistoryWithStore(browserHistory, store);

/** Routes */
const routes = (
	<Provider store={store}>
		<Router history={syncedHistory}>
			<Route path="/" component={App} />
		</Router>
	</Provider>
);

// Render the app.
ReactDOM.render(routes, document.getElementById('app'));