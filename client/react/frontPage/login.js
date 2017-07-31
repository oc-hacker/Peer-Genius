import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

import Form, { Field } from '../components/form';
import { email } from '../components/form/validator';

import { login } from '../../redux/actions/session';

const styles = {
	title: {
		fontSize: '2em',
		textAlign: 'center',
		color: 'black'
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: '1em'
	},
	buttonText: {
		color: 'white'
	}
};

export default connect(null, { login })(stylesheet(styles)(props => {
	let { open, login, onRequestClose, classes } = props;
	
	return (
		<Form
			dialog
			open={open}
			form="login"
			onSubmit={login}
			onRequestClose={onRequestClose}
		>
			<p className={classes.title}>Log In</p>
			<Field.Text
				name="email"
				label="Email"
				warn={[email`'${value => value}' does not look like an email. Are you sure?`]}
			/>
			<Field.Text
				name="password"
				type="password"
				label="Password"
			/>
			<div className={classes.buttonContainer}>
				<RaisedButton
					primary
					type="submit"
					label="Log In"
				/>
			</div>
		</Form>
	);
}));