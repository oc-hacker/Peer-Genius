import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { AppBar } from './components';
import UserRouter from './userRouter';

const styles = {
	maxSize: {
		width: '100%',
		height: '100%'
	}
};

@withStyles(styles)
/**
 * All things that require the user to be logged in go here.
 */
export default class UserPage extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes } = this.props;
		
		return (
			<div className={classes.maxSize}>
				<AppBar />
				<UserRouter />
			</div>
		);
	}
}