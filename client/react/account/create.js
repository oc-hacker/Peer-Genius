import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Form from './util/form.js';
import TextField from './util/materialUI/TextField.js';
import TextFieldConfirm from './util/materialUI/TextFieldConfirm.js';
import TextFieldPasswordConfirm from './util/materialUI/TextFieldPasswordConfirm.js';

import { createAccount } from '../../redux/actions/account.js';

const style = {
	center: {
		textAlign: 'center'
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
			<div>
	        	<Form
	        		formName="createAccount"
	        		header="Create Account"
	        		numInputs={5}
	        		backText="Cancel"
	        		backFunc={this.props.pushToFrontPage}
	        		nextText="Create"
	        		nextFunc={this.props.createAccount}
	        	>
	        		<TextField varName="firstName" hintText="First Name" isRequired={true} />
	        		<TextField varName="lastName" hintText="Last Name" isRequired={true} />
	        		<TextFieldConfirm varName="email" hintText="Email" isRequired={true} />
	        		<TextFieldPasswordConfirm varName="password" hintText="Password" isRequired={true} />
	        		<DateField varName="birthdate" hintText="Birth Date" isRequired={true} minAge={10} maxAge={19} />
	        	</Form>
        	</div>
		);
	}
}