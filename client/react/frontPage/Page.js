import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

const styles = {
	page: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		left: 0,
		right: 0,
		top: 0,
		transition: 'all 1s ease'
	},
	next: {
		top: '100%'
	}
};

@withStyles(styles)
export default class Page extends Component {
	static propTypes = {
		page: PropTypes.number.isRequired,
		currentPage: PropTypes.number.isRequired
	};
	
	render() {
		const { classes, page, currentPage, ...divProps } = this.props;
		
		switch (currentPage) {
			case page: {
				// Current page
				return (
					<div
						className={classes.page}
						{...divProps}
					/>
				);
			}
			case page - 1: {
				// Prepare to scroll in from the bottom.
				return (
					<div
						className={classNames(classes.page, classes.next)}
						{...divProps}
					/>
				);
			}
			default: {
				// Don't bother with rendering if don't need to
				return null;
			}
		}
	}
}