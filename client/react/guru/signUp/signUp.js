import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

import { SubjectFields } from '../../components';

import { Flex, Paper } from '../../components/form';

import { ReduxForm } from '../../components/form';
import DateField from '../../components/form';
import SelectField from '../../components/form';

import { getGuruProfile } from '../../../redux/actions/creators/guru';
import { selectUser } from '../../../redux/selectors/user';

@waitForInit
@connect(state => ({
	user: selectUser(state)
}), {
	getGuruProfile
})
export default class SignUp extends Component {
	render() {

		let { user } = this.props;

		let minDate = new Date(), maxDate = new Date();
		minDate.setFullYear(minDate.getFullYear() - 19);
		maxDate.setFullYear(maxDate.getFullYear() - 13);
		return (
			<Paper>
				<Typography type="title">Fill out the Form</Typography>
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
					{/*<SubjectFields />*/}
					<SelectField name="todo" />
					<SelectField />
					<Flex direction="row-reverse">
						<Button primary type="submit">Done</Button>
					</Flex>
				</ReduxForm>
			</Paper>
		);
	}
}
