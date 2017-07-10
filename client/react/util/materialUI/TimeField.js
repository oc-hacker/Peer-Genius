import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiTextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { verifyText } from './verifyField.js';

const style = {
	container: {
		display: 'flex'
	},
	colon: {
		marginTop: '37px'
	},
	text: {
		marginLeft: 20
	},
	label: {
		whiteSpace: "nowrap"
	},
	hour: {
		width: 80
	},
	minute: {
		width: 80
	}
};

/**
 * @classdesc Wrapper component for Material UI TextFields.
 */
@connect((state, ownProps) => {
	// Initialize values from existing form if possible
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			checkErrors: form.check,
			time: form[ownProps.varName],
			err: form.err[ownProps.varName]
		};
	} else {
		return {
			checkErrors: false,
			time: null,
			err: ''
		}
	}
}, {
	sendFormVar
})
export default class TimeField extends React.Component {
	static propTypes = {
		formName: PropTypes.string.isRequired,			// The name of the form in the Redux store.
		varName: PropTypes.string.isRequired,				// The name of the variable in the Redux store.
		floatingLabelText: PropTypes.string.isRequired,	// The label text floating above the field.
		underlineShow: PropTypes.bool,					// Whether to show an underline underneath the field (defaults to false).
		required: PropTypes.bool,							// Whether the field is required (defaults to true).
		onEnterPress: PropTypes.func.isRequired,			// The function to call on pressing enter.
		verifyFunc: PropTypes.func,						// The function used to verify the field (defauls to simply checking required).
		markRequired: PropTypes.bool.isRequired,			// Whether the field should be marked as required if it is.
		showErrors: PropTypes.bool						// Whether to show errors (defaults to true).
	};

	static defaultProps = {
		underlineShow: true,
		required: true,
		showErrors: true,
		verifyFunc: verifyText
	};

	/** @class */
	constructor(props) {
		super(props);

		if (props.time) {
			this.state = {
				hour: props.time.getHours().toString(),
				minute: props.time.getMinutes().toString()
			};
		} else {
			this.state = {
				hour: '',
				minute: ''
			}
		}
	}

	componentWillReceiveProps = nextProps => {
		// If a form check is started, calculate errors.
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this._onBlur(null, nextProps);
		}
	}

	/**
	 * Converts a number to a string, prepending a '0' if it is less than 10.
	 * 
	 * @param  {Number} [num] The number to convert
	 * @return {String} The number as a string
	 */
	_numToString = num => {
		console.log(num.toString());
		if (num < 10) return '0' + num.toString();
		else return num.toString();
	}

	/**
	 * Event handler for selecting an hour.
	 * 
	 * @param {Object} [event]
	 * @param {Number} [index]
	 * @param {Any} [value]
	 */
	_onHourChange = event => {
		let num = parseInt(event.target.value);
		if (!isNaN(num)) {
			this.setState({
				hour: this._numToString(num)
			});
		} else {
			this.setState({
				hour: ''
			});
		}
	}

	/*
	 * Event handler for selecting a minute.
	 * 
	 * @param {Object} [event]
	 * @param {Number} [index]
	 * @param {Any} [value]
	 */
	_onMinuteChange = (event) => {
		let num = parseInt(event.target.value);
		if (!isNaN(num)) {
			this.setState({
				minute: this._numToString(num)
			});
		} else {
			this.setState({
				minute: ''
			});
		}
	}

	/**
	 * Event handler for when the field loses focus.
	 *
	 * Calculates the error and updates the Redux store.
	 * 
	 * @param {Object} [event]
	 * @param {Object} [props] The props to use (defaults to this.props)
	 */
	_onBlur = (event, props=this.props) => {
		let time = null;
		let newErr = '';

		if (!this.state.hour && !this.state.minute) {
			// If both hour and minute are missing
			if (props.required) {
				newErr = 'This field is required.';
			}
		} else if (!this.state.hour || !this.state.minute) {
			// One of the fields is missing
			newErr = 'Invalid time.'
		} else {
			let hour = parseInt(this.state.hour);
			let minute = parseInt(this.state.minute);
			if (hour < 0 || hour > 23 || minute < 0 || minute > 59) newErr = 'Invalid time.'
			else time = new Date(0, 0, 0, this.state.hour, this.state.minute % 60);
		}

		// Update the Redux store if anything changed.
		if (time !== props.time || newErr !== props.err) {
			props.sendFormVar(props.formName, props.varName, time, newErr);
		}
	}

	/**
	 * Event handler for when a key is pressed.
	 *
	 * Triggers onEnterPress if the key was the enter key.
	 * 
	 * @param {Object} [event]
	 */
	_onKeyPress = event => {
		if (event.key === 'Enter') {
			this.props.onEnterPress();
		}
	}

	render = () => {
		return (
			<div style={style.container}>
				<MuiTextField
					value={this.state.hour}
					hintText="Hour"
					floatingLabelText={this.props.floatingLabelText + (this.props.required && this.props.markRequired ? '*' : '')}
					floatingLabelStyle={style.label}
					errorText={this.props.showErrors ? this.props.err : ''}
					underlineShow={this.props.underlineShow}
					inputStyle={style.text}
					hintStyle={style.text}
					labelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onHourChange}
					onBlur={this._onBlur}
					onKeyPress={this._onKeyPress}
					style={style.hour}
				/>
				<div style={style.colon}>:</div>
				<MuiTextField
					value={this.state.minute}
					hintText="Minute"
					floatingLabelText=" "
					underlineShow={this.props.underlineShow}
					inputStyle={style.text}
					labelStyle={style.text}
					hintStyle={style.text}
					floatingLabelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onMinuteChange}
					onBlur={this._onBlur}
					onKeyPress={this._onKeyPress}
					style={style.minute}
				/>
			</div>
		);
	}
}