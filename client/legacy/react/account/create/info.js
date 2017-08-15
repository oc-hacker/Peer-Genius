import React from 'react';

import * as Field from '../../components/form/field';

import { email, range, required, same } from '../../components/form/validator';

export default props => {
	let currentYear = new Date().getFullYear();
	// The following two values are in milliseconds since 1970.
	let minDate = new Date().setFullYear(currentYear - 19);
	let maxDate = new Date().setFullYear(currentYear - 13);
	
	return (
		<div {...props}>
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
				validate={[required`You must have an email address.`]}
				warn={[email`'${value => value}' does not look like an email address.`]}
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
				name="birthday"
				label="Date of Birth"
				disableToday
				minAge={12}
				maxAge={20}
				validate={[required`When were you born?`]}
				warn={[range(minDate, maxDate, [true, true], (value, bound) => {
					if (value) {
						return new Date(value).getTime() - bound;
					}
					else {
						return false;
					}
				})`You must be between 13 years and 18 years of age to participate at Peer Genius.`]}
			/>
		</div>
	);
}