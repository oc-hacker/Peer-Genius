import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';

import { connect } from 'react-redux';

import DisabledInput from './DisabledInput';

const styles = theme => ({
	dialogTitle: {
		backgroundColor: theme.palette.primary[500]
	}
});

class DatePickerDialog extends Component {
	static propTypes = {
		open: PropTypes.bool,
		onRequestClose: PropTypes.func,
		onSelect: PropTypes.func,
		startDate: PropTypes.object,
		classes: PropTypes.object
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			year: null,
			month: null,
			date: null
		};
	}
	
	render() {
		let { classes, open, onRequestClose, onSelect } = this.props;
		
		return (
			<Dialog open={open} onRequestClose={onRequestClose}>
				<DialogTitle className={classes.dialogTitle}>
					Hello world!
				</DialogTitle>
			</Dialog>
		);
	}
}

@withStyles(styles)
export class DateFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			open: false
		};
	}
	
	_openPicker = () => {
		this.setState({
			open: true
		});
	};
	
	_closePicker = () => {
		this.setState({
			open: false
		});
	};
	
	render() {
		let {
			input: { value, onChange, onFocus, onBlur, ...input }, meta: { touched, error, warning },
			label, type, classes, fullWidth, ...fieldProps
		} = this.props;
		let { open } = this.state;
		
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
					value={value.toDateString()}
					component={DisabledInput}
					onClick={this._openPicker}
					classes={{
						error: classNames({
							[classes.warningInput]: touched && (warning && !error)
						})
					}}
				/>
				<FormHelperText classes={{ error: warningClass }}>
					{touched && (error || warning)}
				</FormHelperText>
				<DatePickerDialog
					classes={classes}
					open={open} onRequestClose={this._closePicker}
				/>
			</FormControl>
		);
	}
}

export default class DateField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		minDate: PropTypes.object,
		maxDate: PropTypes.object
	};
	
	_format = value => new Date(value);
	
	_parse = input => input.toISOString();
	
	render() {
		return (
			<Field
				component={DateFieldComponent}
				format={this._format}
				parse={this._parse}
				{...this.props}
			/>
		);
	}
}