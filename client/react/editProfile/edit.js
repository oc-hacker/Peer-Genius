import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

import { Flex, Paper, waitForInit } from '../components';
import { ReduxForm, TextField, DateField } from '../components/form';

import { editProfile } from '../../redux/actions/creators/user';
import { selectUser } from '../../redux/selectors/user';

@waitForInit
@connect(state => ({
	user: selectUser(state)
}), {
	editProfile
})
export default class EditProfile extends Component {
	render() {
		let { user, editProfile } = this.props;
		
		return (
			<Paper>
				<Typography type="title">Edit Profile</Typography>
				<ReduxForm
					form="editProfile" onSubmit={editProfile}
					initialValues={user}
				>
					<TextField
						name="firstName"
						label="First Name"
					/>
					<TextField
						name="lastName"
						label="Last Name"
					/>
					<DateField
						name="birthdate"
						label="Date of Birth"
					/>
					<Flex direction="row-reverse">
						<Button
							raised color="primary"
							type="submit"
						>
							Confirm
						</Button>
					</Flex>
				</ReduxForm>
			</Paper>
		);
	}
}