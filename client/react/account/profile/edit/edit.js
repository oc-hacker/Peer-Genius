import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

import { Flex, Spacer, Text } from '../../../components';
import { DateField, ReduxForm, TextField } from '../../../components/form';

import { editProfile } from '../../../../redux/actions/creators/user';
import { selectUser } from '../../../../redux/selectors/user';

import FieldIcon from './FieldIcon';

const styles = ({ palette: { grey }, spacing }) => ({
	main: {
		width: '60%',
		paddingTop: spacing.unit * 2
	},
	heading: {
		textTransform: 'uppercase',
		letterSpacing: spacing.unit * 0.3
	},
	divider: {
		height: 1,
		backgroundColor: grey[300],
		margin: `${spacing.unit * 2}px 0`
	},
	headerUnderline: {
		width: '40%',
		marginRight: '60%',
		backgroundColor: grey[700],
	},
	row: {
		margin: `${spacing.unit * 2}px 0`
	},
	field: {
		marginBottom: 0
	},
	label: {
		flexBasis: '6em',
		flexGrow: 1,
		maxWidth: '10em'
	},
	input: {
		flexBasis: '4em',
		flexGrow: 3
	},
	button: {
		borderRadius: '100vh',
		textTransform: 'none',
		boxShadow: 'none',
		fontWeight: 600,
		color: '#68676c',
		padding: '1em 3em'
	}
});

// @waitForInit
@connect(state => ({
	user: selectUser(state)
}), {
	editProfile
})
@withStyles(styles)
export default class EditProfile extends Component {
	render() {
		let { user, editProfile, classes } = this.props;
		
		const fieldClasses = {
			className: classes.field,
			inputClass: classes.input,
			labelClass: classes.label
		};
		
		return (
			<Flex column align="center" grow={1}>
				<Flex column className={classes.main}>
					<Text
						type="title" className={classes.heading}
						color="primary" size="2em" weight={600}
					>
						Update Profile
					</Text>
					<div className={classNames(classes.divider, classes.headerUnderline)} />
					<ReduxForm
						form="editProfile" onSubmit={editProfile}
						initialValues={user}
					>
						<Flex align="center" className={classes.row}>
							<FieldIcon />
							<Spacer width="1em" />
							<TextField
								{...fieldClasses}
								name="firstName"
								label="First Name"
							/>
						</Flex>
						<Flex align="center" className={classes.row}>
							<FieldIcon />
							<Spacer width="1em" />
							<TextField
								{...fieldClasses}
								name="lastName"
								label="Last Name"
							/>
						</Flex>
						<Flex align="center" className={classes.row}>
							<FieldIcon />
							<Spacer width="1em" />
							<DateField
								{...fieldClasses}
								name="birthdate"
								label="Date of Birth"
							/>
						</Flex>
						<Flex align="center" className={classes.row}>
							<FieldIcon />
							<Spacer width="1em" />
							<TextField
								{...fieldClasses}
								name="email"
								label="Email address"
							/>
						</Flex>
						<Flex align="center" className={classes.row}>
							<FieldIcon />
							<Spacer width="1em" />
							<TextField
								{...fieldClasses}
								name="school"
								label="School distruct"
							/>
						</Flex>
						<Flex align="flex-start" className={classes.row}>
							<FieldIcon />
							<Spacer width="1em" />
							<TextField
								{...fieldClasses}
								name="biography"
								label="Your biography"
								multiline
							/>
						</Flex>
						<Flex>
							<Button
								className={classes.button}
								raised color="accent"
								type="submit"
							>
								Save
							</Button>
						</Flex>
					</ReduxForm>
				</Flex>
			</Flex>
		);
	}
}