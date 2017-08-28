import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import SettingsIcon from 'material-ui-icons/Settings';

import { connect } from 'react-redux';

import { Flex } from '../../../components';
import { ReduxForm, TextField } from '../../../components/form';

import { editPassword } from '../../../../redux/actions/creators/account';
import { required, same } from '../../../components/form/validator';

const styles = ({ palette: { text } }) => ({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	icon: {
		flexBasis: 24
	},
	label: {
		flexBasis: '5em',
		flexGrow: 1
	},
	field: {
		flexBasis: '3em',
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
				<Flex>
					<SettingsIcon className={classes.icon} />
					<Typography className={classes.label}>Old Password</Typography>
					<TextField
						className={classes.field}
						name="oldPassword"
						type="password"
						label="Old Password"
						validate={[required`Please enter your old password.`]}
					/>
				</Flex>
				<Flex>
					<SettingsIcon className={classes.icon} />
					<Typography className={classes.label}>New Password</Typography>
					<TextField
						className={classes.field}
						name="newPassword"
						type="password"
						label="New Password"
					/>
				</Flex>
				<Flex>
					<SettingsIcon className={classes.icon} />
					<Typography className={classes.label}>Confirm Password</Typography>
					<TextField
						className={classes.field}
						name="confirmPassword"
						type="password"
						label="Confirm New Password"
						validate={[same('newPassword')`Passwords do not match.`]}
					/>
				</Flex>
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