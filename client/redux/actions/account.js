import fetch from 'isomorphic-fetch';
import httpStatus from 'http-status-codes';

import cookie from 'js-cookie';
import { push } from 'react-router-redux';

import store from '../store.js';
import { createForm, sendFormErr } from './forms.js';
import { verifySession } from './session.js';
import { initUserInfo, updateUserInfo, createUserInfoForm } from './userInfo.js';

import { types } from '../../reference/actionTypes.js';
import { post } from '../../reference/api';

import { serverURL } from '../../config.js';

/**
 * Redux Thunk action for creating a student account.
 */
export const createAccount = (values) => async dispatch => {
	// Get the 'createAccount' form stored in the Redux store.
	dispatch({
		type: types.CREATE_ACCOUNT,
		status: types.REQUEST
	});
	
	let birthdate = new Date(values.birthdate);
	
	// Send a POST request to create the account.
	const response = await post('/api/createAccount', {
		email: values.email,
		password: values.password,
		firstName: values.firstName,
		lastName: values.lastName,
		birthday: {
			year: birthdate.getFullYear(),
			month: birthdate.getMonth(),
			date: birthdate.getDate()
		},
		communication: values.communication
	});
	
	if (response.ok) {
		// Initialize all of the information from the server.
		let json = await response.json();
		dispatch(initUserInfo({ ...json.account, ...json.user }));
		
		// Store the session JWT as a cookie.
		await cookie.set('sessionJWT', json.sessionJWT);
		
		// Refresh the session and push to the account page.
		await dispatch(verifySession());
		dispatch(push('/home'));
		
		dispatch({
			type: types.CREATE_ACCOUNT,
			status: types.SUCCESS,
			successText: 'Account Created!'
		});
	}
	else if (response.status === httpStatus.CONFLICT) {
		// If the account is not created successfully, dispatch an action to inform the user that the email has been taken.
		dispatch(sendFormErr('createAccount', 'email', 'This email has been taken.'));
		
		dispatch({
			type: types.CREATE_ACCOUNT,
			status: types.FAILURE
		});
	} else {
	
	}
};

/**
 * Redux Thunk action to send a user info edit to the server.
 */
export const sendEdit = values => async dispatch => {
	dispatch({
		type: types.SEND_EDIT,
		status: types.REQUEST
	});
	
	// Send a POST request to the server to send the edits
	const response = await post('/api/account/edit', { info: values });
	
	if (response.ok) {
		// Upon success, update the user info object with the new info
		dispatch(updateUserInfo(values));
		
		dispatch({
			type: types.SEND_EDIT,
			status: types.SUCCESS,
			successText: 'Saved!'
		});
	}
	else {
		dispatch({
			type: types.SEND_EDIT,
			status: types.FAILURE
		});
	}
};

/**
 * Redux Thunk action for editing one's password.
 *
 * @return {Boolean} Whether the request was successful
 */
export const editPassword = values => async dispatch => {
	dispatch({
		type: types.SEND_EDIT,
		status: types.REQUEST
	});
	
	// Send a POST request to edit the password.
	const response = await post('/api/account/edit', {
		password: values.oldPassword,
		newPassword: values.newPassword
	});
	
	if (response.ok) {
		// Upon success clear the form.
		dispatch(createForm('editPassword'));
		
		dispatch({
			type: types.SEND_EDIT,
			status: types.SUCCESS,
			successText: 'Saved!'
		});
		
		return true;
	} else {
		// Upon failure send an incorrect password error to the form.
		dispatch(sendFormErr('editPassword', 'oldPassword', 'Incorrect password.'));
		
		dispatch({
			type: types.SEND_EDIT,
			status: types.FAILURE
		});
		
		return false;
	}
};

/**
 * Redux Thunk action to edit one's email.
 */
export const editEmail = values => async dispatch => {
	dispatch({
		type: types.SEND_EDIT,
		status: types.REQUEST
	});
	
	// Send a POSt request to edit the email.
	const response = await post('/api/account/edit', {
		password: values.password,
		email: values.email
	});
	
	if (response.ok) {
		dispatch({
			type: types.SEND_EDIT,
			status: types.SUCCESS,
			successText: 'Saved!'
		});
	} else {
		// Upon failure send an incorrect password error to the form.
		dispatch(sendFormErr('editEmail', 'password', 'Incorrect password.'));
		
		dispatch({
			type: types.SEND_EDIT,
			status: types.FAILURE
		});
	}
};