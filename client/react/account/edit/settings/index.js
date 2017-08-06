import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';
import { isInvalid } from 'redux-form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

import { ReduxForm, Field } from '../../../components/form/index';
import EditEmail from './email';
import EditPassword from './password';

import styles from '../styles';
import { editEmail, editPassword } from '../../../../redux/actions/account';
import { email, required, same } from '../../../components/form/validator';

// Account-related stuff (email & password)
@connect(state => ({
	emailFormInvalid: isInvalid('editEmail')(state),
	passwordFormInvalid: isInvalid('editPassword')(state)
}), dispatch => ({
	editPassword: values => {
		let { oldPassword, newPassword } = values;
		dispatch(editPassword({ oldPassword, newPassword }));
	}
}))
@stylesheet(styles)
export default class EditAccount extends PureComponent {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes, editPassword } = this.props;
		
		return (
			<div className={classes.vertFlex}>
				<Paper style={styles.margin}>
					<EditEmail />
				</Paper>
				<Paper style={styles.margin}>
					<EditPassword />
				</Paper>
			</div>
		);
	}
}