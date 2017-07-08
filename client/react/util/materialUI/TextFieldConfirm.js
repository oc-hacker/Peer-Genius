import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiTextField from 'material-ui/TextField';

import { verifyText } from './verifyField.js';

const style = {
	text: {
		marginLeft: 20,
		paddingRight: 40
	}
};

/**
 * @classdesc Wrapper component for text fields with confirmation.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		let error = form.err[ownProps.varName];
		let err = error || '|';
		let breakIndex = err.indexOf('|');

		return {
			checkErrors: form.check,
			text: form[ownProps.varName],
			error,
			err: err.substring(0, breakIndex),
			confirmErr: err.substring(breakIndex + 1)
		};
	} else {
		return {
			checkErrors: false,
			text: '',
			err: '',
			confirmErr: ''
		}
	}
}, {
	sendFormVar
})
export default class TextFieldConfirm extends React.Component {
	static propTypes = {
		formName: PropTypes.string.isRequired,	// The name of the form in the Redux store.
		varName: PropTypes.string.isRequired,		// The name of the variable in the Redux store.
		hintText: PropTypes.string.isRequired,	// The hint text to display.
		floatingLabelText: PropTypes.string,		// The label text floating above the field (defaults to the hint text).
		underlineShow: PropTypes.bool,			// Whether to show an underline underneath the field (defaults to false).
		required: PropTypes.bool,					// Whether the field is required (defaults to true).
		onEnterPress: PropTypes.func.isRequired,	// The function to call on pressing enter.
		verifyFunc: PropTypes.func,				// The function used to verify the field (defauls to simply checking required).
		markRequired: PropTypes.bool.isRequired,	// Whether the field should be marked as required if it is.
		showErrors: PropTypes.bool,				// Whether to show errors (defaults to true).
		width: PropTypes.number.isRequired		// The width of the field.
	};

	static defaultProps = {
		required: true,
		underlineShow: true,
		showErrors: true,
		verifyFunc: verifyText
	};

	/** @class */
	constructor(props) {
		super(props);

		// Set the state to the texts stored in Redux, or empty strings if nothing is stored.
		this.state = {
			text: this.props.text || '',
			confirmText: this.props.text || '',
			confirmTouched: false
		}
	}

	componentWillReceiveProps= nextProps => {
		// If a form check is started, calculate errors.
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this._onBlur(null, nextProps);
		}
	}

	/**
	 * Event handler for when the text changes.
	 * 
	 * @param {Object} event
	 */
	_onChange = event => {
		this.setState({
			text: event.target.value
		});
	}

	/**
	 * Event handler for when the text changes.
	 * 
	 * @param {Object} event
	 */
	_onConfirmChange = event => {
		this.setState({
			confirmText: event.target.value
		});
	}

	/**
	 * Event handler for when the field loses focus.
	 *
	 * Calculates the error and updates the Redux store.
	 *
	 * Also calls _onConfirmBlur to update whether the confirm field matches.
	 * 
	 * @param {Object} [event]
	 * @param {Object} [props] The props to use (defaults to this.props)
	 */
	_onBlur = (event, props=this.props) => {
		let newErr = this.props.verifyFunc(this.state.text, props.required);

		this._onConfirmBlur(event, props, newErr);
	}

	/**
	 * Event handler for when the field loses focus.
	 *
	 * Calculates the error and updates the Redux store.
	 * 
	 * @param {Object} [event]
	 * @param {Object} [props] The props to use (defaults to this.props)
	 */
	_onConfirmBlur = (event, props=this.props, newErr=this.props.err) => {
		// Set touched to true if the text was altered, or if during a form check.
		if (!this.state.confirmTouched && (this.state.confirmText || !event)) {
			this.setState({
				confirmTouched: true
			});
		}

		// Only error is not matching the main field.
		let newConfirmErr = '';
		if (this.state.confirmText !== this.state.text) {
			newConfirmErr = 'Fields do not match.';
		}

		// Send the error as separated with a '|' to store as one string.
		let newError = newErr + '|' + newConfirmErr;
		if (this.state.text !== props.text || newError !== props.error) {
			props.sendFormVar(props.formName, props.varName, this.state.text, newError);
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
		// The floatingLabelText of the confirm field is the same as that of the other field, except with 'Confirm ' appended to the front.
		let confirmFloatingLabelText = 'Confirm ' + (this.props.floatingLabelText || this.props.hintText) + (this.props.required && this.props.markRequired ? '*' : '');

		return (
			<div>
				<MuiTextField
					value={this.state.text}
					hintText={this.props.hintText}
					floatingLabelText={(this.props.floatingLabelText || this.props.hintText) + (this.props.required && this.props.markRequired ? '*' : '')}
					errorText={this.props.showErrors ? this.props.err : ''}
					underlineShow={this.props.underlineShow}
					inputStyle={style.text}
					hintStyle={style.text}
					floatingLabelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onChange}
					onBlur={this._onBlur}
					onKeyPress={this._onKeyPress}
					fullWidth={true}
					type={this.props.password ? 'password' : 'text'}
				/>
				<MuiTextField
					value={this.state.confirmText}
					hintText={this.props.hintText}
					floatingLabelText={confirmFloatingLabelText}
					errorText={this.props.showErrors && this.state.confirmTouched ? this.props.confirmErr : ''}
					underlineShow={this.props.underlineShow}
					inputStyle={style.text}
					hintStyle={style.text}
					floatingLabelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onConfirmChange}
					onBlur={this._onConfirmBlur}
					onKeyPress={this._onKeyPress}
					fullWidth={true}
					type={this.props.password ? 'password' : 'text'}
				/>
			</div>
		);
	}
}