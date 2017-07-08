import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiTextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import { verifyText } from './verifyField.js';

const style = {
	container: {
		position: 'relative',
		width: '100%',
		height: '100%'
	},
	iconButton: {
		position: 'absolute',
		right: 0,
		top: '22px'
	},
	text: {
		marginLeft: 20,
		paddingRight: 40
	}
};

/**
 * @classdesc TextField component for passwords (includes hide/unhide button).
 *
 * See TextField for detailed comments on shared features.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			checkErrors: form.check,
			text: form[ownProps.varName],
			err: form.err[ownProps.varName]
		};
	} else {
		return {
			checkErrors: false,
			text: '',
			err: ''
		}
	}
}, {
	sendFormVar
})
export default class TextFieldPassword extends React.Component {
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
		width: PropTypes.number.isRequired		// The width of the  field.
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

		this.state = {
			text: this.props.text || '',
			hidden: true
		}
	}

	componentWillReceiveProps= nextProps => {
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this._onBlur(null, nextProps)
		}
	};

	_onChange = event => {
		this.setState({
			text: event.target.value
		});
	};

	_onBlur = (event, props=this.props) => {
		let newErr = this.props.verifyFunc(this.state.text, props.required);

		if (this.state.text !== props.text || newErr !== props.err) {
			props.sendFormVar(props.formName, props.varName, this.state.text, newErr);
		}
	};

	_onKeyPress = event => {
		if (event.key === 'Enter') {
			this.props.onEnterPress();
		}
	};

	/**
	 * @return {React.Component} The IconButton to show for the hide/unhide button
	 */
	_getHideIconButton = () => {
		if (this.state.hidden) {
			return (
				<IconButton tooltip="Unhide" onClick={this._toggleHide} style={style.iconButton}>
					<Visibility />
				</IconButton>
			);
		} else {
			return (
				<IconButton tooltip="Hide" onClick={this._toggleHide} style={style.iconButton}>
					<VisibilityOff />
				</IconButton>
			)
		}
	}

	/**
	 * Event handler for toggling whether the password is hidden.
	 */
	_toggleHide = () => {
		this.setState({
			hidden: !this.state.hidden
		});
	}

	render = () => {
		return (
			<div style={style.container}>
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
					type={this.state.hidden ? 'password' : 'text'}
				/>
				{this._getHideIconButton()}
			</div>
		);
	}
}