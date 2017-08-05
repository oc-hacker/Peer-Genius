import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

import RaisedButton from 'material-ui/RaisedButton';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { StyledForm,  Field } from '../components/form';
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

export default reduxForm({
	form: 'login',
	onSubmit: (values, dispatch) => dispatch(login(values))
})(stylesheet(styles)(props => {
	let { handleSubmit, open, onRequestClose, classes } = props;
	
	return (
		<StyledForm
			dialog
			dialogProps={{ open, onRequestClose }}
			onSubmit={handleSubmit}
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
		</StyledForm>
	);
}));