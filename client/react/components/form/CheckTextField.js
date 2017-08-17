import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import { connect } from 'react-redux';

const styles = {
	field: {
		display: 'flex',
		flexDirection: 'row'
	},
	formControl: {
		flexGrow: 1
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

@withStyles(styles)
class CheckTextFieldComponent extends Component {
	static propTypes = {
		checkLabel: PropTypes.string,
		textLabel: PropTypes.string,
		uncheckedValue: PropTypes.any,
		autoClear: PropTypes.bool, // Whether unchecking clears the text field
		checkboxProps: PropTypes.object,
		inputProps: PropTypes.object
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			checked: false,
			value: ''
		};
	}
	
	_onCheckboxChange = (event, checked) => {
		let { input: { onChange }, autoClear, uncheckedValue } = this.props;
		
		this.setState({
			checked
		});
		if (!checked && autoClear) {
			this.setState({
				value: ''
			});
		}
		
		onChange(checked ? this.state.value : uncheckedValue);
	};
	
	_onInputFocus = () => {
		this.props.input.onFocus();
	};
	
	_onInputChange = event => {
		let { input: { onChange } } = this.props;
		let { value } = event.target;
		
		this.setState({
			value
		});
		onChange(value);
	};
	
	_onInputBlur = () => {
		let { uncheckedValue } = this.props;
		let { checked, value } = this.state;
		this.props.input.onBlur(checked ? value : uncheckedValue);
	};
	
	componentWillMount() {
		let { input: { value, onChange }, uncheckedValue } = this.props;
		if (value !== '') {
			this.setState({
				checked: true,
				value
			});
		}
		else {
			onChange(uncheckedValue);
		}
	}
	
	render() {
		let {
			input: { name }, meta: { touched, error, warning },
			checkLabel, textLabel, uncheckedValue, autoClear, classes,
			checkboxProps, inputProps
		} = this.props;
		let { checked, value } = this.state;
		
		let warningClass = classNames({
			[classes.warning]: touched && (warning && !error)
		});
		
		return (
			<div className={classes.field}>
				<FormControlLabel
					label={checkLabel}
					checked={checked}
					onChange={this._onCheckboxChange}
					control={<Checkbox />}
					{...checkboxProps}
				/>
				<FormControl error={touched && (error || warning)}>
					<InputLabel className={warningClass}>
						{textLabel}
					</InputLabel>
					<Input
						disabled={!checked}
						name={name}
						value={value}
						onFocus={this._onInputFocus}
						onChange={this._onInputChange}
						onBlur={this._onInputBlur}
						classes={{
							error: classNames({
								[classes.warningInput]: touched && (warning && !error)
							})
						}}
						{...inputProps}
					/>
					<FormHelperText className={warningClass}>
						{touched && (error || warning)}
					</FormHelperText>
				</FormControl>
			</div>
		);
	}
}

export default class CheckTextField extends Component {
	static propTypes = {
		name: PropTypes.string,
		checkLabel: PropTypes.string,
		textLabel: PropTypes.string,
		uncheckedValue: PropTypes.any,
		autoClear: PropTypes.bool, // Whether unchecking clears the text field
		checkboxProps: PropTypes.object,
		inputProps: PropTypes.object
	};
	
	static defaultProps = {
		uncheckedValue: null
	};
	
	render() {
		return (
			<Field
				component={CheckTextFieldComponent}
				{...this.props}
			/>
		);
	}
}