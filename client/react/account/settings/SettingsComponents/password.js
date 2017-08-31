import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import SettingsIcon from 'material-ui-icons/Settings';

import { connect } from 'react-redux';

import { Flex, Spacer, Text } from '../../../components';
import { ReduxForm, TextField } from '../../../components/form';

import { editPassword } from '../../../../redux/actions/creators/account';
import { required, same } from '../../../components/form/validator';

const styles = ({ palette: { text }, spacing }) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	row: {
		margin: spacing.unit,
		marginBottom: spacing.unit * 2,
		alignItems: 'center'
	},
	field: {
		marginBottom: 0
	},
	icon: {
		flexBasis: 24
	},
	input: {
		flexBasis: '3em',
		flexGrow: 2
	},
	label: {
		color: text.secondary,
		flexBasis: '5em',
		flexGrow: 1
	},
	button: {
		borderRadius: '100vh',
		textTransform: 'none',
		boxShadow: 'none',
		fontWeight: 600,
		color: '#68676c',
	}
});

@connect(null, { editPassword })
@withStyles(styles)
export default class EditPassword extends Component {
	render() {
		let { classes } = this.props;
		
		return (
			<ReduxForm
				className={classes.root}
				form="editPassword" onSubmit={this.props.editPassword}
			>
				<Flex className={classes.row}>
					<SettingsIcon className={classes.icon} />
					<Spacer width="2em" />
					<TextField
						className={classes.field}
						labelClass={classes.label}
						inputClass={classes.input}
						name="oldPassword"
						type="password"
						label="Old Password"
						validate={[required`Please enter your old password.`]}
					/>
				</Flex>
				<Flex className={classes.row}>
					<SettingsIcon className={classes.icon} />
					<Spacer width="2em" />
					<TextField
						className={classes.field}
						labelClass={classes.label}
						inputClass={classes.input}
						name="newPassword"
						type="password"
						label="New Password"
						validate={[required`Please enter your new password.`]}
					/>
				</Flex>
				<Flex className={classes.row}>
					<SettingsIcon className={classes.icon} />
					<Spacer width="2em" />
					<TextField
						className={classes.field}
						labelClass={classes.label}
						inputClass={classes.input}
						name="confirmPassword"
						type="password"
						label="Confirm New Password"
						validate={[same('newPassword')`Passwords do not match.`]}
					/>
				</Flex>
				<Spacer height="3em" />
				<div>
					<Button
						className={classes.button}
						raised color="accent"
						type="submit"
					>
						Save
					</Button>
				</div>
			</ReduxForm>
		);
	}
}