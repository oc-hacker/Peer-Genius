import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route, NotFound } from './components';
import Home from './home';
import AccountRouter from './account';
import GuruRouter from './guru';
import NewbieRouter from './newbie';

export default class UserRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Switch>
				<Route access="private" path="/home" component={Home} />
				<Route access="private" path="/account" component={AccountRouter} />
				<Route access="private" path="/guru" component={GuruRouter} />
				<Route access="private" path="/newbie" component={NewbieRouter} />
				{/*<Route access="all" path="/" component={NotFound} />*/}
			</Switch>
		);
	}
}