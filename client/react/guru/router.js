import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../components';
import SignUp from './signUp';

export default class GuruRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { match: { url } } = this.props;
		
		return (
			<Switch>
				<Route path={`${url}/signUp`} component={SignUp} />
			</Switch>
		);
	}
}