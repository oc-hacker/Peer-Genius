import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../components';
import AccountSettings from './settings';
import ProfileRouter from './profile';

export default class AccountRouter extends Component {
	render() {
		let { match: { url } } = this.props;
		
		return (
			<Switch>
				<Route path={`${url}/settings`} component={AccountSettings} />
				<Route path={`${url}/profile`} component={ProfileRouter} />
			</Switch>
		);
	}
}