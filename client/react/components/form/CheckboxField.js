import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel } from 'material-ui/Form';

import { connect } from 'react-redux';

class CheckboxFieldComponent extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let {
			input, meta: { touched, error, warning },
			label, classes, ...fieldProps
		} = this.props;
		
		return (
			<FormControl error={touched && (error || warning)}>
				<FormControlLabel
					label={label}
					{...input}
					control={<Checkbox />}
				/>
			</FormControl>
		);
	}
}

export default class CheckboxField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string
	};
	
	render() {
		return (
			<Field
				component={CheckboxFieldComponent}
				{...this.props}
			/>
		);
	}
}