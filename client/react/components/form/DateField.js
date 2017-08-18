import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import ClickInput from './ClickInput';
import DatePickerDialog from './DateFieldComponents/DatePickerDialog';

const styles = {};

@withStyles(styles)
export class DateFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		firstDayOfWeek: PropTypes.number,
		defaultMode: PropTypes.oneOf('date', 'year')
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
	
	_onConfirm = date => {
		this._closePicker();
		this.props.input.onBlur(date);
	};
	
	render() {
		let {
			input, meta, label, classes,
			firstDayOfWeek, defaultMode,
			...inputProps
		} = this.props;
		let { open } = this.state;
		
		return (
			<ClickInput
				input={{
					...input,
					value: input.value ? input.value.toDateString() : ''
				}}
				meta={meta}
				label={label}
				onClick={this._openPicker}
				{...inputProps}
			>
				<DatePickerDialog
					classes={classes}
					open={open} onRequestClose={this._closePicker}
					title={label} value={input.value}
					firstDayOfWeek={firstDayOfWeek} defaultMode={defaultMode}
					onSelect={this._onConfirm}
				/>
			</ClickInput>
		);
	}
}

export default class DateField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		minDate: PropTypes.object,
		maxDate: PropTypes.object,
		firstDayOfWeek: PropTypes.number,
		defaultMode: PropTypes.oneOf('date', 'year')
	};
	
	static defaultProps = {
		firstDayOfWeek: 0,
		defaultMode: 'date'
	};
	
	_format = value => value && new Date(value);
	
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