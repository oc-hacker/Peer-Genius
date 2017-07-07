import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { sendEdit, editEmail, editPassword } from '../../redux/actions/account.js';
import { initUserInfoForm } from '../../redux/actions/userInfo.js';

import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

import Form from '../util/form.js';
import TextField from '../util/materialUI/TextField.js';
import TextFieldConfirm from '../util/materialUI/TextFieldConfirm.js';
import TextFieldPassword from '../util/materialUI/TextFieldPassword.js';
import TextFieldConfirmPassword from '../util/materialUI/TextFieldConfirmPassword.js';
import SelectField from '../util/materialUI/SelectField.js';
import DateField from '../util/materialUI/DateField.js';
import { verifyEmailText } from '../util/materialUI/verifyField.js';

const style = {
	vertFlex: {
		display: 'flex',
		flexDirection: 'column'
	},
	horizFlex: {
		display: 'flex',
		justifyContent: 'center'
	},
	margin: {
		margin: 20
	},
	grow: {
		flexGrow: 1
	}
}

/**
 * @classdesc Form for editing personal info.
 */
@connect(null, dispatch => ({
	sendEdit: async () => {
		dispatch(sendEdit());
	},
	editPassword: async () => {
		dispatch(editPassword());
	},
	editEmail: async () => {
		dispatch(editEmail());
	},
	createForm: async formName => {
		await dispatch(createForm(formName));
	},
	initUserInfoForm: async () => {
		dispatch(initUserInfoForm());
	}
}))
export default class EditAccount extends React.Component {
	_submitPassword = async () => {
		let success = await this.props.editPassword();

		if (success) {
			// Upon success clear the edit password form
			await this.props.createForm('editPassword');
		}
	}

	_submitEmail = async () => {
		let success = await this.props.editEmail();

		if (success) {
			// Upon success clear the edit email form.
			await this.props.createForm('editEmail');
		}
	}

	componentWillMount = () => {
		this.props.initUserInfoForm();
	}

	render = () => {
		return (
			<div style={style.horizFlex}>
				<div style={style.vertFlex}>
					<Paper style={style.margin}>
						<Form formName="userInfo" header="User Info" nextText="Save" backText="" nextFunc={this.props.sendEdit} numInputs={3}>
							<TextField varName="firstName" hintText="First Name" required={false} />
							<TextField varName="lastName" hintText="Last Name" required={false} />
							<DateField varName="birthdate" floatingLabelText="Birth Date" required={false} minAge={10} maxAge={19} />
						</Form>
					</Paper>
					<div style={style.grow} />
				</div>

				<div style={style.vertFlex}>
					<Paper style={style.margin}>
						<Form formName="editPassword" header="Edit Password" nextText="Save" nextFunc={this._submitPassword} numInputs={2}>
							<TextFieldPassword varName="oldPassword" hintText="Old Password" />
							<TextFieldConfirmPassword varName="newPassword" hintText="New Password" />
						</Form>
					</Paper>

					<Paper style={style.margin}>
						<Form formName="editEmail" header="Edit Email" nextText="Save" nextFunc={this._submitEmail} numInputs={2}>
							<p style={style.margin}>Please note that, after editing your email, you must confirm it before the change is applied.</p>
							<TextFieldPassword varName="password" hintText="Password" />
							<TextFieldConfirm varName="email" hintText="New Email" verifyFunc={verifyEmailText} />
						</Form>
					</Paper>
				</div>
			</div>
		);
	}
};