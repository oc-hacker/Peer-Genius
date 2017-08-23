import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route } from './components';
import Home from './home';
import Account from './account';
import Guru from './guru';

export default class UserRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/account" component={Account} />
				<Route path="/guru" component={Guru}  />
			</Switch>
		);
	}
}