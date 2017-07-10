import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiCheckbox from 'material-ui/Checkbox';

const style = {
	checkbox: {
		width: "80%",
		padding: 20
	}
};

/**
 * @classdesc Wrapper component for Material UI Checkboxes.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			checked: form[ownProps.varName] || false,
			err: form.err[ownProps.varName],
			checkErrors: form.check
		};
	} else {
		return {
			checked: false,
			err: '',
			checkErrors: false
		};
	}
}, {
	sendFormVar
})
export default class CheckBox extends React.Component {
	static propTypes = {
		formName: PropTypes.string.isRequired,	// The name of the form object in the Redux store.
		varName: PropTypes.string.isRequired,		// The name of the form variable in the form object.
		label: PropTypes.string.isRequired,		// The label to display on the checkbox.
		required: PropTypes.bool,					// Whether the checkbox must be checked; defaults to true.
		leftLabel: PropTypes.bool 				// Whether to place the label on the left or right
	};

	static defaultProps = {
		required: true,
		leftLabel: false
	};

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.checkErrors && !this.props.checkErrors) {
			// Only check errors if checkErrors switched from false to true.
			let err = '';
			if (nextProps.required && !this.props.checked) {
				// Only error is if the checkbox is required but not checked.
				err = 'This field is required.';
			}

			// Send the error to the Redux store.
			this.props.sendFormVar(nextProps.formName, nextProps.varName, nextProps.checked, err);
		}
	}

	_toggle = (event, checked) => {
		// Only possible error is if the checkbox is required but not checked.
		let err = '';
		if (this.props.required && !this.props.checked) {
			err = 'This field is required.';
		}

		// Send the updated variable and error to the Redux store.
		this.props.sendFormVar(this.props.formName, this.props.varName, !this.props.checked, err);
	}

	render = () => {
		return (
			<MuiCheckbox
				checked={this.props.checked}
				label={this.props.label}
				labelPosition={this.props.leftLabel ? "left" : "right"}
				onCheck={this._toggle}
				style={style.checkbox}
			/>
		)
	}
}