import fetch from 'isomorphic-fetch';

import { push } from 'react-router-redux';

import store from '../store.js';
import { sendFormErr } from './forms.js'

import { types } from '../../reference/actionTypes.js';

import { serverURL } from '../../config';

/**
 * Redux Thunk action for verifying an email.
 * 
 * @param  {String} [key] The email verification key
 */
export const verifyEmail = key => async dispatch => {
	dispatch({
		type: types.VERIFY_EMAIL,
		status: types.REQUEST
	});

	// Send a POST request to the server to verify the email
	const response = await fetch(serverURL + '/api/verifyEmail', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			key
		})
	});

	if (response.ok) {
		dispatch({
			type: types.VERIFY_EMAIL,
			status: types.SUCCESS
		});
	} else {
		// Upon failure, push to home
		dispatch(push('/'));

		dispatch({
			type: types.VERIFY_EMAIL,
			status: types.FAILURE
		});
	}
}

/**
 * Redux Thunk action for resending the verification email.
 */
export const resendVerificationEmail = () => async dispatch => {
	dispatch({
		type: types.RESEND_VERIFICATION_EMAIL,
		status: types.REQUEST
	});

	// Send a POST request to get the verification email resent.
	const response = await fetch(serverURL + '/api/account/resendVerifyEmail', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	});

	if (response.ok) {
		dispatch({
			type: types.RESEND_VERIFICATION_EMAIL,
			status: types.SUCCESS,
			successText: 'Sent!'
		});
	} else {
		dispatch({
			type: types.RESEND_VERIFICATION_EMAIL,
			status: types.FAILURE
		});
	}
}

/**
 * Redux Thunk action for requesting a password reset.
 */
export const requestReset = () => async dispatch => {
	dispatch({
		type: types.REQUEST_RESET,
		status: types.REQUEST
	});

	// Send a POST request to request a password reset.
	const response = await fetch(serverURL + '/api/requestReset', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: store.getState().forms.requestReset.email
		})
	});

	if (response.ok) {
		// Upon success push to home.
		dispatch(push('/'));

		dispatch({
			type: types.REQUEST_RESET,
			status: types.SUCCESS,
			successText: 'Request Sent!'
		});
	} else {
		// Upon failure send an error to the form.
		dispatch(sendFormErr('requestReset', 'email', 'Email not found; try again'));

		dispatch({
			type: types.REQUEST_RESET,
			status: types.FAILURE
		});
	}
}

/**
 * Redux Thunk action to check a password reset key.
 * 
 * @param  {String} [key] The password reset key
 */
export const checkReset = key => async dispatch => {
	dispatch({
		type: types.CHECK_RESET,
		status: types.REQUEST
	});

	// Send a POST request to check the password reset key.
	const response = await fetch(serverURL + '/api/checkReset', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			key
		})
	});

	if (response.ok) {
		dispatch({
			type: types.CHECK_RESET,
			status: types.SUCCESS
		});
	} else {
		// Upon failure push to home
		dispatch(push('/'));

		dispatch({
			type: types.CHECK_RESET,
			status: types.FAILURE
		});
	}
}

/**
 * Redux Thunk action to send a password reset.
 * 
 * @param  {String} [key] The password reset key
 */
export const sendReset = key => async dispatch => {
	dispatch({
		type: types.SEND_RESET,
		status: types.REQUEST
	});

	// Send a POST request to reset the password
	const response = await fetch(serverURL + '/api/sendReset', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			key,
			newPassword: store.getState().forms.reset.password
		})
	});

	if (response.ok) {
		// Upon success, push to home
		dispatch(push('/'));

		dispatch({
			type: types.SEND_RESET,
			status: types.SUCCESS,
			successText: 'Reset Successful!'
		});
	} else {
		// Upon failure, send an error to the form
		dispatch(sendFormErr('reset', 'password', 'Connection error: please try again'));

		dispatch({
			type: types.SEND_RESET,
			status: types.FAILURE
		});
	}
}