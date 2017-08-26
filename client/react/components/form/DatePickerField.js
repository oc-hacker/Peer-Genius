import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import ClickInput from './ClickInput';
import DatePickerDialog from './DatePickerFieldComponents/DatePickerDialog';

const styles = {};

@withStyles(styles)
export class DatePickerFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		firstDayOfWeek: PropTypes.number,
		defaultMode: PropTypes.oneOf(['date', 'year'])
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
			minDate, maxDate, firstDayOfWeek, defaultMode,
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
					minDate={minDate} maxDate={maxDate}
					firstDayOfWeek={firstDayOfWeek} defaultMode={defaultMode}
					onSelect={this._onConfirm}
				/>
			</ClickInput>
		);
	}
}

export default class DatePickerField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		firstDayOfWeek: PropTypes.number,
		defaultMode: PropTypes.oneOf(['date', 'year'])
	};
	
	static defaultProps = {
		firstDayOfWeek: 0,
		defaultMode: 'date',
		minDate: new Date(new Date().getFullYear() - 50, new Date().getMonth(), new Date().getDate()),
		maxDate: new Date(new Date().getFullYear() + 50, new Date().getMonth(), new Date().getDate())
	};
	
	_format = value => value && new Date(value);
	
	_parse = input => input.toISOString();
	
	render() {
		return (
			<Field
				component={DatePickerFieldComponent}
				format={this._format}
				parse={this._parse}
				{...this.props}
			/>
		);
	}
}