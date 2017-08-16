import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { connect } from 'react-redux';

import { Route } from './components';
import FrontPage from './frontPage';
import { initialize } from '../redux/actions/creators/init';

@connect(null, { initialize })
export default class MasterRouter extends Component {
	componentWillMount() {
		this.props.initialize();
	}
	
	render() {
		return (
			<Switch>
				<Route isPublic path="/" exact component={FrontPage} />
			</Switch>
		);
	}
}