import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

import { ReduxForm, Field } from '../../components/form';

import styles from './styles';
import { sendEdit } from '../../../redux/actions/account';
import { required } from '../../components/form/validator';

// User-related stuff (name, address, birthdate, etc)
@connect(state => ({
	userInfo: state.userInfo
}), dispatch => ({
	sendEdit: async values => dispatch(sendEdit(values))
}))
@stylesheet(styles)
export default class EditProfile extends PureComponent {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes, sendEdit, userInfo: { firstName, lastName, birthdate } } = this.props;
		let bdMatch = /(\d{4})-(\d{2})-(\d{2})/.exec(birthdate);
		let initialValues = {
			firstName,
			lastName,
			birthdate: bdMatch ? new Date(bdMatch[1], parseInt(bdMatch[2]) + 1, bdMatch[3]) : null // +1 to compensate for the way js handles months.
		};
		
		return (
			<div className={classes.vertFlex}>
				<Paper style={styles.margin}>
					<ReduxForm
						form="editProfile"
						onSubmit={sendEdit}
						initialValues={initialValues}
					>
						<h2>Edit Profile</h2>
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
							name="birthdate"
							label="Date of Birth"
						/>
						<div className={classes.horizFlex}>
							<div style={{ flexGrow: 1 }} />
							<RaisedButton
								primary
								label="Save"
								type="submit"
								style={styles.margin}
							/>
						</div>
					</ReduxForm>
				</Paper>
			</div>
		);
	}
}