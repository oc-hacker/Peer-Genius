import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createForm, refreshForm, clearForm, formLoaded, startFormCheck, endFormCheck } from '../../redux/actions/forms.js';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
	header: {
		textAlign: 'center',
		fontSize: '2em'
	},
	button: {
		margin: 20
	}
};

/**
 * @classdesc The component in each Form component that handles checking the form fields.
 *
 * This ensures that the whole form doesn't need to be refreshed when checking, only the checker.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			check: form.check,
			errors: form.err
		};
	} else {
		return {
			check: false,
			errors: {}
		};
	}
}, {
	endFormCheck
})
class FormChecker extends React.Component {
	static propTypes = {
		formName: PropTypes.string.isRequired,	// The name of the form object in the Redux store.
		submit: PropTypes.func.isRequired,		// The function to called when the form check is successful.
		numToCheck: PropTypes.number.isRequired	// The number of fields to check.
	};
	
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.check) {
			// Check errors only if 'check' us true and the errors object changed.
			let valid = true;
			let numErrors = 0;

			for (let errName in nextProps.errors) {
				let err = nextProps.errors[errName];
				// Count the errors.
				numErrors++;
				
				if (err && err.length > 1) {
					// If an error exists and has a length greater than one, the form is not valid.
					valid = false;
				}
			}

			if (numErrors === nextProps.numToCheck) {
				// If the number of errors is equal to the number of fields to check, end the form check.
				nextProps.endFormCheck(nextProps.formName);
				if (valid) {
					// If all errors are blank, call submit.
					nextProps.submit();
				}
			}
		}
	}

	render = () => {
		// Don't render anything.
		return null;
	}
};

/**
 * @classdesc The parent component for all forms.  Puts all field components in Paper,
 *            and passes them formName, width, markRequired, and onEnterPress props.
 */
@connect((state, ownProps) => ({
	formExists: !!(state.forms[ownProps.formName])
}), {
	createForm,
	refreshForm,
	clearForm,
	formLoaded,
	startFormCheck
})
export default class Form extends React.Component {
	static propTypes = {
		formName: PropTypes.string.isRequired, 	// The name of the form object in the Redux store.
		numInputs: PropTypes.number.isRequired,	// The number of inputs in the form.
		header: PropTypes.string,					// The header to display
		nextText: PropTypes.string,				// The text to display on the next button; defaults to 'Submit'.
		backText: PropTypes.string,				// The text to display on the back button
		nextFunc: PropTypes.func.isRequired,		// The function to call when the next button is pressed.
		backFunc: PropTypes.func,					// The function to call when the back button is pressed.
		nextStyle: PropTypes.object,				// The style for the next button; defaults to right-aligned
		backStyle: PropTypes.object,				// The style for the back button; defaults to none
		width: PropTypes.number,					// The width of the form; defaults to 500.
		markRequired: PropTypes.bool 				// Whether to put * after required fields; defaults to true.
	};

	static defaultProps = {
		nextText: 'Submit',
		nextStyle: {
			textAlign: 'right'
		},
		backStyle: {},
		width: 500,
		markRequired: true
	};

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {
		if (this.props.formExists) {
			// Refresh the form before rendering.
			this.props.refreshForm(this.props.formName);
		} else {
			this.props.createForm(this.props.formName);
		}
	}

	componentDidMount = () => {
		// Mark that the form has loaded after rendering.
		this.props.formLoaded();
	}

	componentWillUnmount = () => {
		// Delete the form after 1 second`
		this.props.clearForm(this.props.formName);
	}

	_startCheck = () => {
		this.props.startFormCheck(this.props.formName);
	}

	_getHeader = () => {
		// Return a header unless the header is an empty string.
		return this.props.header ? <p style={style.header}>{this.props.header}</p> : null;
	}

	render = () => {
		if (this.props.formExists) {
			// If there is no back text, render a <br /> for spacing.  Otherwise, render a back button.
			let backButton;
			if (this.props.backText) {
				backButton = (
					<div style={this.props.backStyle}>
						<RaisedButton
							label={this.props.backText}
							primary={true}
							onClick={this.props.backFunc}
							style={style.button}
						/>
					</div>
				);
			} else {
				backButton = <br />;
			}

			return (
				<div style={{width: this.props.width, position: 'relative'}}>
					{/* Form checker. */}
					<FormChecker formName={this.props.formName} submit={this.props.nextFunc} numToCheck={this.props.numInputs} />
					
					{backButton}

					{this._getHeader()}

					{/* Pass onEnterPress, markRequired, width, and formName props to all children. */}
					{React.Children.map(this.props.children, child => (React.cloneElement(child, {
						onEnterPress: this._startCheck,
						markRequired: this.props.markRequired,
						width: this.props.width,
						formName: this.props.formName
					})))}

					{/* Next button. */}
					<div style={this.props.nextStyle}>
						<RaisedButton
							label={this.props.nextText}
							primary={true}
							onClick={this._startCheck}
							style={style.button}
						/>
					</div>
				</div>
			);
		} else {
			// Don't render anything if the form object doesn't exist yet.
			return null;
		}
	}
};