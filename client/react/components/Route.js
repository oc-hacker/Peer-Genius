import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import cookies from 'js-cookie';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


@connect(null, { push })
/**
 * @classdesc A custom <code>Route</code> component that automatically detects whether the user is in session and may push the user accordingly.
 */
export default class CustomRoute extends Component {
	static propTypes = {
		isPublic: PropTypes.bool,
		path: PropTypes.string,
		component: PropTypes.func,
		render: PropTypes.func
	};
	
	componentWillMount() {
		let { isPublic, push } = this.props;
		let jwt = cookies.get('sessionJWT');
		
		// Check that the user is in a valid place.
		if (isPublic && jwt) {
			push('/home');
		}
		else if (!isPublic && !jwt) {
			push('/');
		}
	}
	
	render() {
		// Extract router props
		let { isPublic, push, ...routeProps } = this.props;
		
		return (<Route {...routeProps} />);
	}
}