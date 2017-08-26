import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route } from '../../components';
import SessionsList from './list';
import SessionDetails from './details';

export default class SessionsRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { match: { url } } = this.props;
		
		return (
			<Switch>
				<Route exact path={`${url}`} component={SessionsList}/>
				<Route path={`${url}/:sessionID`} component={SessionDetails} />
			</Switch>
		);
	}
}