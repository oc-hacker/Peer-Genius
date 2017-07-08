import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiSelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
	text: {
		marginLeft: 20
	}
};

/**
 * @classdesc Wrapper component for Material UI SelectFields.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			checkErrors: form.check,
			value: form[ownProps.varName],
			err: form.err[ownProps.varName]
		};
	} else {
		return {
			checkErrors: false,
			value: null,
			err: ''
		}
	}
}, {
	sendFormVar
})
export default class SelectField extends React.Component {
	static propTypes = {
		varName: PropTypes.string.isRequired,				// The variable name in the Redux store.
		items: PropTypes.arrayOf(PropTypes.shape({	// The items to display under the SelectField.
			value: PropTypes.any,							// The value of the item (can be anything).
			text: PropTypes.string						// The text to show in the SelectField.
		})).isRequired,
		hintText: PropTypes.string.isRequired,			// The hint text to display.
		floatingLabelText: PropTypes.string,				// The label floating above the field (defaults to the hint text).
		required: PropTypes.bool,							// Whether the field is required.
		markRequired: PropTypes.bool.isRequired,			// Whether to mark the field as required.
		showErrors: PropTypes.bool,						// Whether to show the errors.
		width: PropTypes.number.isRequired				// The width of the field.
	};

	static defaultProps = {
		required: true,
		showErrors: true
	};

	/** @class */
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value
		}
	}

	componentWillReceiveProps= nextProps => {
		// If the form check has been started, 
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this._onBlur(null, nextProps)
		}
	}

	/**
	 * Event handler for selecting an item.
	 * 
	 * @param {Object} [event]
	 * @param {Number} [index]
	 * @param {Any} [value]
	 */
	_onChange = async (event, index, value) => {
		await this.setState({
			value
		});

		this._onBlur(event);
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
		let newErr = '';
		if (!this.state.value && props.required) {
			// The only possible error is that the field is required but not selected.
			newErr = 'This field is required.';
		}

		// Send the value and error to the Redux store if either changed.
		if (this.state.value !== props.value || newErr !== props.err) {
			props.sendFormVar(props.formName, props.varName, this.state.value, newErr);
		}
	}

	render = () => {
		let i = 1;
		let items = this.props.items;

		return (
			<MuiSelectField
				value={this.state.value}
				hintText={this.props.hintText}
				floatingLabelText={(this.props.floatingLabelText || this.props.hintText) + (this.props.required && this.props.markRequired ? '*' : '')}
				errorText={this.props.showErrors ? this.props.err : ''}
				labelStyle={style.text}
				hintStyle={style.text}
				floatingLabelStyle={style.text}
				errorStyle={style.text}
				onChange={this._onChange}
				onBlur={this._onBlur}>

				{items.map((item) => (
					<MenuItem value={item.value} key={i++} primaryText={item.text} />
				))}
			</MuiSelectField>
		);
	}
}