import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, touch } from 'redux-form';

import { connect } from 'react-redux';

import { StyledForm, Field } from '../../../components/form';
import { email, required, same } from '../../../components/form/validator';
import { FormToolbar } from '../../../components/form/utils';
import { editEmail } from '../../../../redux/actions/account';

@connect(null, dispatch => ({
	touch: (...fields) => dispatch(touch('editEmail', ...fields)),
	reset: (...fields) => dispatch(reset('editEmail'))
}))
@reduxForm({
	form: 'editEmail',
	onSubmit: (values, dispatch) => {
		return dispatch(editEmail(values));
	}
})
export default class EditEmail extends PureComponent {
	constructor(props) {
		super(props);
	}
	
	_onSubmit = (...params) => {
		let { invalid, touch, handleSubmit } = this.props;
		if (invalid) { // If validation fails, touch all fields to ensure errors are displayed.
			params[0].preventDefault();
			touch('password', 'email', 'confirmEmail');
		}
		else {
			handleSubmit(...params);
		}
	};
	
	render() {
		return (
			<StyledForm onSubmit={this._onSubmit}>
				<h2>Edit Email</h2>
				<Field.Text
					name="password"
					label="Password"
					validate={[required`Please enter your password.`]}
				/>
				<Field.Text
					name="email"
					label="New Email"
					validate={[required`Please enter the new email you wish to change to.`]}
					warn={[email`This does not look like an email address. Are you sure?`]}
				/>
				<Field.Text
					name="confirmEmail"
					label="Confirm New Email"
					validate={[same('email')`'${value => value}' does not match '${(value, all) => all.email}'.`]}
				/>
				<FormToolbar label="Save" reset={this.props.reset} />
			</StyledForm>
		);
	}
}