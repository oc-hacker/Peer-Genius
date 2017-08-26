import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import { FormHelperText } from 'material-ui/Form';

import { connect } from 'react-redux';

const styles = ({ palette: { error } }) => ({
	error: {
		color: error[500]
	},
	warning: {
		color: orange[500]
	}
});

@withStyles(styles)
export default class HelperText extends Component {
	static propTypes = {
		error: PropTypes.any,
		warning: PropTypes.any
	};
	
	render() {
		let { error, warning, classes } = this.props;
		
		return (
			<FormHelperText
				className={classNames({
					[classes.warning]: warning,
					[classes.error]: error,
				})}
			>
				{error || warning}
			</FormHelperText>
		);
	}
}