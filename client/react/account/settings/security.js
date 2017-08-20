import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

import { Flex, Paper } from '../../components/index';
import { ReduxForm, TextField } from '../../components/form/index';

import { required, same } from '../../components/form/validator';
import { editPassword } from '../../../redux/actions/creators/account';

@connect(null, { editPassword })
export default class EditSecurity extends Component {
	render() {
		return (
			<Paper>
				<Typography type="title">Security</Typography>
				<ReduxForm form="editPassword" onSubmit={this.props.editPassword}>
					<TextField
						name="oldPassword"
						type="password"
						label="Old Password"
						validate={[required`Please enter your old password.`]}
					/>
					<TextField
						name="newPassword"
						type="password"
						label="New Password"
					/>
					<TextField
						name="confirmPassword"
						type="password"
						label="Confirm New Password"
						validate={[same('newPassword')`Passwords do not match.`]}
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