import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route } from '../../components';
import ViewProfile from './view';
import EditProfile from './edit';

export default class ProfileRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { match: { url } } = this.props;
		
		return (
			<Switch>
				<Route exact path={url} component={ViewProfile} />
				<Route path={`${url}/edit`} component={EditProfile} />
			</Switch>
		);
	}
}