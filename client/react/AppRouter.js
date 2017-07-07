import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { push } from 'react-router-redux';

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

@connect(state => ({
	inSession: state.inSession
}), {
	push
})
class LoggedInRoute extends React.Component {
	componentWillMount() {
		if (this.props.inSession === 0) {
			this.props.push('/');
		} else {
		}
	}

	render() {
		return (
			<Route path={this.props.path} component={this.props.component} />
		);
	}
}

@connect(state => ({
	inSession: state.inSession
}), {
	push
})
class LoggedOutRoute extends React.Component {
	componentWillMount() {
		console.log('Checking logged out...')
		if (this.props.inSession === 1) {
			this.props.push('/home');
		} else {
		}
	}

	render() {
		return (
			<Route path={this.props.path} component={this.props.component} />
		);
	}
}

// Weird, now router needs to have the full path to work, no matter where.
class AccountRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/account/edit" component={EditAccount}/>
				<Route path="/account/settings" component={AccountSettings}/>
			</Switch>
		);
	}
}

export default class AppRouter extends React.Component {
	render() {
	 	return (
			<div style={style.content}>
				<Switch>
					<LoggedOutRoute exact path="/" component={FrontPage}/>
					<LoggedOutRoute path="/createAccount" component={CreateAccount}/>
					<LoggedInRoute path="/home" component={Home}/>
					<LoggedInRoute path="/account" component={AccountRouter}/>
				</Switch>
			</div>
		);
	}
}