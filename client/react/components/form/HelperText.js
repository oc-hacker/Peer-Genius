import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';

const styles = ({ palette: { error, warning } }) => ({
	root: {
		position: 'absolute',
		top: '100%',
		right: 0,
	},
	error: {
		color: error[500]
	},
	warning: {
		color: warning[500]
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
					[classes.root]: true,
					[classes.warning]: warning,
					[classes.error]: error,
				})}
			>
				{error || warning}
			</FormHelperText>
		);
	}
}