import React, { Component } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { connect } from 'react-redux';

import { Route } from './components';
import FrontPage from './frontPage';
import UserPage from './userPage';
import { initialize } from '../redux/actions/creators/init';

import { browserHistory } from '../redux/store';

@connect(null, { initialize })
export default class MasterRouter extends Component {
	componentWillMount() {
		this.props.initialize();
	}
	
	render() {
		// TODO make UserPage not public once testing is finished.
		return (
			<ConnectedRouter history={browserHistory}>
				<Switch>
					<Route isPublic exact path="/" component={FrontPage} />
					<Route isPublic path="/" component={UserPage}/>
				</Switch>
			</ConnectedRouter>
		);
	}
}