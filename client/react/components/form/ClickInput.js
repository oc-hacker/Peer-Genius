import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
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
		return (<input {...this.props} disabled />);
	}
}

@withStyles(styles)
export default class ClickInput extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired
	};
	
	render() {
		let {
			input, meta: { touched, error, warning },
			label, classes, fullWidth, children,
			...inputProps
		} = this.props;
		
		let warningClass = classNames({
			[classes.warning]: touched && (warning && !error)
		});
		
		return (
			<FormControl
				className={classes.fieldContainer}
				fullWidth={fullWidth !== false}
				error={touched && (error || warning)}
			>
				<InputLabel className={warningClass}>
					{label}
				</InputLabel>
				<Input
					{...input}
					{...inputProps}
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
				{...children}
			</FormControl>
		);
	}
}