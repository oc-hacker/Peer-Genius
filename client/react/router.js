import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { connect } from 'react-redux';

import { Route } from './components';
import FrontPage from './frontPage';

export default class MasterRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Switch>
				<Route isPublic path="/" exact component={FrontPage} />
			</Switch>
		);
	}
}