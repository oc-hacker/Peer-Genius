import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { SubjectFields } from '../../components';
import { ReduxForm } from '../../components/form';

import DateField from '../../components/form';
import SelectField from '../../components/form';

export default class SignUp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let minDate = new Date(), maxDate = new Date();
		minDate.setFullYear(minDate.getFullYear() - 19);
		maxDate.setFullYear(maxDate.getFullYear() - 13);
		return (
			<div>
				<ReduxForm form="becomeAGuru" onSubmit={console.log}>
					<DateField
						name="birthdate"
						label="Date of Birth"
						defaultMode="year"
						minDate={new Date(minDate.getFullYear() - 1, minDate.getMonth(), minDate.getDate())}
						maxDate={new Date(maxDate.getFullYear() + 1, maxDate.getMonth(), maxDate.getDate())}
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
					<SelectField />
					<SelectField />
					<SelectField />
				</ReduxForm>
			</div>
		);
	}
}
