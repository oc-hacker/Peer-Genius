import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { connect } from 'react-redux';

import { Route } from './components';
import FrontPage from './frontPage';
import CreateAccount from './createAccount';
import { initialize } from '../redux/actions/creators/init';

import { browserHistory } from '../redux/store';

@connect(null, { initialize })
export default class MasterRouter extends Component {
	componentWillMount() {
		this.props.initialize();
	}
	
	render() {
		return (
			<ConnectedRouter history={browserHistory}>
				<Switch>
					<Route isPublic exact path="/" component={FrontPage} />
					<Route isPublic path="/createAccount" component={CreateAccount} />
				</Switch>
			</ConnectedRouter>
		);
	}
}