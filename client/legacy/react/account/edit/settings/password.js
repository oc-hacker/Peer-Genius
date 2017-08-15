import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, touch } from 'redux-form';

import { connect } from 'react-redux';

import { StyledForm, Field } from '../../../components/form';
import { required, same } from '../../../components/form/validator';
import { FormToolbar } from '../../../components/form/utils';
import { editPassword } from '../../../../redux/actions/account';

@connect(null, dispatch => ({
	touch: (...fields) => dispatch(touch('editPassword', ...fields)),
	reset: (...fields) => dispatch(reset('editPassword'))
}))
@reduxForm({
	form: 'editPassword',
	onSubmit: (values, dispatch) => {
		return dispatch(editPassword(values))
	}
})
export default class EditPassword extends PureComponent {
	constructor(props) {
		super(props);
	}
	
	_onSubmit = (...params) => {
		let { invalid, touch, handleSubmit } = this.props;
		if (invalid) { // If validation fails, touch all fields to ensure errors are displayed.
			params[0].preventDefault();
			touch('oldPassword', 'newPassword', 'confirmPassword');
		}
		else {
			handleSubmit(...params);
		}
	};
	
	render() {
		return (
			<StyledForm onSubmit={this._onSubmit}>
				<h2>Edit Password</h2>
				<Field.Text
					name="oldPassword"
					label="Old Password"
					validate={[required`Please enter your old password.`]}
				/>
				<Field.Text
					name="newPassword"
					label="New Password"
					validate={[required`Please enter your new password.`]}
				/>
				<Field.Text
					name="confirmPassword"
					label="Confirm New Password"
					validate={[same('newPassword')`Passwords do not match.`]}
				/>
				<FormToolbar label="Save" reset={this.props.reset} />
			</StyledForm>
		)
	}
}