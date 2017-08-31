import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

import { Flex, Paper, Text, waitForInit } from '../../../components';
import { DateField, ReduxForm, TextField } from '../../../components/form';

import { editProfile } from '../../../../redux/actions/creators/user';
import { selectUser } from '../../../../redux/selectors/user';

const styles = ({ palette: { grey }, spacing }) => ({
	headerUnderline: {
		width: '40%',
		marginRight: '60%',
		backgroundColor: grey[700],
	},
	divider: {
		height: 1,
		backgroundColor: grey[300],
		margin: `${spacing.unit * 2}px 0`
	}
});

@waitForInit
@connect(state => ({
	user: selectUser(state)
}), {
	editProfile
})
@withStyles(styles)
export default class EditProfile extends Component {
	render() {
		let { user, editProfile, classes } = this.props;
		
		return (
			<div>
				<Text
					type="title" className={classes.heading}
					color="primary" size="2em" weight={600}
				>
					Edit Profile
				</Text>
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
			</div>
		);
	}
}