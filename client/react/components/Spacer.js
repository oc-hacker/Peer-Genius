import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

const styles = {
	spacer: {
		width: props => props.width || '100%',
		height: props => props.height || '100%',
		backgroundColor: 'transparent'
	}
};

@stylesheet(styles)
export default class Spacer extends PureComponent {
	render() {
		return (
			<div className={this.props.classes.spacer} />
		);
	}
}