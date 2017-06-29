import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { sendEdit } from '../../redux/actions/account.js';
import { initUserInfoForm } from '../../redux/actions/userInfo.js';

import Dialog from 'material-ui/Dialog';

import Form from '../util/form.js';
import TextField from '../util/materialUI/TextField.js';
import SelectField from '../util/materialUI/SelectField.js';
import DateField from '../util/materialUI/DateField.js';

/**
 * @classdesc Form for editing personal info.
 */
@connect(null, {
	initUserInfoForm,
	sendEdit
})
export default class EditAccount extends React.Component {
	componentWillMount = () => {
		this.props.initUserInfoForm();
	}

	render = () => {
		return (
			<Form formName="userInfo" header="User Info" nextText="Save" backText="" nextFunc={this.props.sendEdit} numInputs={3}>
				<TextField varName="firstName" hintText="First Name" required={false} />
				<TextField varName="lastName" hintText="Last Name" required={false} />
				<DateField varName="birthdate" floatingLabelText="Birth Date" required={false} minAge={10} maxAge={19} />
			</Form>
		);
	}
};