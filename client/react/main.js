import 'babel-polyfill';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider, connect } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import store, {browserHistory} from '../redux/store.js';

// MaterialUI Theme
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(baseTheme);

import AppRouter from './AppRouter.js';
import AppBar from './AppBar.js';

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
		return {muiTheme};
	};
	
	render() {
		return (
			<div>
				<AppBar />
				
				<AppRouter/>
			</div>
		)
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