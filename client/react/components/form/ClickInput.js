import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import { connect } from 'react-redux';

const styles = {
	fieldContainer: {
		position: 'relative',
	},
	input: {
		cursor: 'pointer'
	},
	warning: {
		color: orange[500]
	},
	warningInput: {
		'&:after': {
			backgroundColor: orange[500]
		}
	}
};

class DisabledInput extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { rowsMax, ...inputProps } = this.props;
		if (rowsMax > 1) {
			return (<textarea {...inputProps} disabled />);
		}
		else {
			return (<input {...inputProps} disabled />);
		}
	}
}

@withStyles(styles)
export default class ClickInput extends Component {
	static propTypes = {
		input: PropTypes.object,
		meta: PropTypes.object,
		label: PropTypes.string,
		fullWidth: PropTypes.bool,
		firstChildren: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node)
		]),
		onClick: PropTypes.func.isRequired,
		inputProps: PropTypes.object
	};
	
	render() {
		let {
			input, meta: { touched, error, warning },
			label, classes, fullWidth, children, firstChildren,
			onClick, inputProps
		} = this.props;
		
		let warningClass = classNames({
			[classes.warning]: touched && (warning && !error)
		});
		
		return (
			<FormControl
				className={classes.fieldContainer}
				fullWidth={fullWidth !== false}
				error={Boolean(touched && (error || warning))}
			>
				{firstChildren}
				<InputLabel
					className={warningClass}
					shrink={Boolean(input.value)}
				>
					{label}
				</InputLabel>
				<Input
					{...input}
					{...inputProps}
					component={DisabledInput}
					onClick={onClick}
					classes={{
						input: classes.input,
						error: classNames({
							[classes.warningInput]: touched && (warning && !error)
						})
					}}
				/>
				<FormHelperText classes={{ error: warningClass }}>
					{touched && (error || warning)}
				</FormHelperText>
				{children}
			</FormControl>
		);
	}
}