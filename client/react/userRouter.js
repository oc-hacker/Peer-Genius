import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route } from './components';
import Home from './home';

export default class UserRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Switch>
				<Route isPublic path="/home" component={Home}/>
			</Switch>
		);
	}
}