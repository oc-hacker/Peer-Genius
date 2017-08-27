import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route, withProps } from '../../../components';
import SessionDetails from './details';
import ReviewSession from './review';

export default class DetailsRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { match: { url, params } } = this.props;
		
		return (
			<Switch>
				<Route exact path={`${url}/`} render={withProps({ sessionID: params.sessionID })(SessionDetails)} />
				<Route path={`${url}/review`} render={withProps({ sessionID: params.sessionID })(ReviewSession)} />
			</Switch>
		);
	}
}