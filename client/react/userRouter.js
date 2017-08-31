import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route, NotFound } from './components';
import HomeRouter from './home';
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
				<Route path="/home" component={HomeRouter} />
				<Route path="/account" component={AccountRouter} />
				<Route path="/guru" component={GuruRouter} />
				<Route path="/newbie" component={NewbieRouter} />
				{/*<Route access="all" path="/" component={NotFound} />*/}
			</Switch>
		);
	}
}
