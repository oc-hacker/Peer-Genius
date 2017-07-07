import React from 'react';

import { Route } from 'react-router';

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

// Weird, now router needs to have the full path to work, no matter where.
class AccountRouter extends React.Component {
	render() {
		return (
			<div>
				<Route path="/account/create" component={CreateAccount}/>
				<Route path="/account/edit" component={EditAccount}/>
				<Route path="/account/settings" component={AccountSettings}/>
			</div>
		);
	}
}

export default class AppRouter extends React.Component {
	render() {
	 	return (
			<div style={style.content}>
				<Route exact path="/" component={FrontPage}/>
				<Route path="/home" component={Home}/>
				<Route path="/account" component={AccountRouter}/>
			</div>
		);
	}
}