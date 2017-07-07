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
};

// This is here for reference
const useless = (<div>
	<Router history={syncedHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={FrontPage}/>
			
			<Route path="home" component={Home}/>
			
			<Route path="account">
				<Route path="create" component={CreateAccount}/>
				
				<Route path="edit" component={EditAccount}/>
				
				<Route path="settings" component={AccountSettings}/>
			</Route>
		</Route>
	</Router>
</div>);

const AccountRouter = () => (
	<div>
		<Route path="create" component={CreateAccount}/>
		<Route path="edit" component={EditAccount}/>
		<Route path="settings" component={AccountSettings}/>
	</div>
);

const AppRouter = () => (
	<div style={style.content}>
		<Route exact path="" component={FrontPage}/>
		<Route path="home" component={Home}/>
		<Route path="account" component={AccountRouter}/>
	</div>
);

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