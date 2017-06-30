import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';

import Form from '../util/form.js';
import TextField from '../util/materialUI/TextField.js';
import TextFieldConfirm from '../util/materialUI/TextFieldConfirm.js';
import TextFieldConfirmPassword from '../util/materialUI/TextFieldConfirmPassword.js';
import DateField from '../util/materialUI/DateField.js';

import { createAccount } from '../../redux/actions/account.js';

const style = {
	center: {
		display: 'flex',
		justifyContent: 'center'
	}
}

@connect(null, dispatch => ({
	createAccount: () => {
		dispatch(createAccount());
	},
	pushToFrontPage: () => {
		dispatch(push('/'));
	}
}))
export default class CreateAccount extends React.Component {
	render() {
		return (
			<div style={style.center}>
				<Form
	        		formName="createAccount"
	        		header="Create Account"
	        		numInputs={5}
	        		nextText="Create"
	        		nextFunc={this.props.createAccount}
	        		width={500}
	        	>
	        		<TextField varName="firstName" hintText="First Name" isRequired={true} />
	        		<TextField varName="lastName" hintText="Last Name" isRequired={true} />
	        		<TextFieldConfirm varName="email" hintText="Email" isRequired={true} />
	        		<TextFieldConfirmPassword varName="password" hintText="Password" isRequired={true} />
	        		<DateField varName="birthdate" floatingLabelText="Birth Date" isRequired={true} minAge={13} maxAge={19} />
	        	</Form>
        	</div>
		);
	}
}