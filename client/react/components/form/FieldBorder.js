import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';

import { connect } from 'react-redux';

const styles = ({ palette: { grey, error }, spacing }) => ({
	root: {
		borderWidth: 1,
		borderRadius: spacing.unit / 2,
		borderStyle: 'solid',
		borderColor: grey[300],
		boxSizing: 'border-box',
		
		fontSize: 'inherit',
	},
	error: {
		borderColor: error[500],
		boxShadow: `0 0 ${Math.round(spacing.unit / 2)}px ${error[500]}`
	},
	warning: {
		borderColor: orange[500],
		boxShadow: `0 0 ${Math.round(spacing.unit / 2)}px ${orange[500]}`
	}
});

@withStyles(styles)
export default class FieldBorder extends Component {
	static propTypes = {
		error: PropTypes.any,
		warning: PropTypes.any
	};
	
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes, className, error, warning, ...others } = this.props;
		
		return (
			<div
				className={classNames(
					classes.root,
					{
						[classes.warning]: warning
					},
					{
						[classes.error]: error
					},
					className
				)}
				{...others}
			/>
		);
	}
}