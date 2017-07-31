import React from 'react';

import Field from '../../components/form/field';

import { email, required, same } from '../../components/form/validator';

export default props => (
	<div key="stable" {...props}>
		<Field.Text
			name="firstName"
			label="First Name"
			validate={[required`You have a name, right?`]}
		/>
		<Field.Text
			name="lastName"
			label="Last Name"
			validate={[required`You have a name, right?`]}
		/>
		<Field.Text
			name="email"
			label="Email"
			warn={[email`${value => value} does not appear to be an email address.`]}
		/>
		<Field.Text
			name="confirmEmail"
			label="Confirm Email"
			validate={[same('email')`'${value => value}' does not match '${(value, all) => all.email}'.`]}
		/>
		<Field.Text
			type="password"
			name="password"
			label="Password"
			validate={[required`Please set a password.`]}
		/>
		<Field.Text
			type="password"
			name="confirmPassword"
			label="Confirm Password"
			validate={[same('password')`Passwords do not match.`]}
		/>
		<Field.Date
			name="brithdate"
			label="Date of Birth"
			disableToday
			minAge={13}
			maxAge={19}
		/>
	</div>
)