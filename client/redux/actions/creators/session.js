// Actions here are concerned with things related to the session jwt.
import cookies from 'js-cookie';
import httpStatus from 'http-status-codes';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import { sessionJWTExpire } from '../../../config';
import types from '../types';
import { post, status } from '../request';

/**
 * Thunk action creator that takes in credentials and tries to log in the user
 * @param {{email: string, password: string}} credentials
 */
export const logIn = credentials => async dispatch => {
	let response = await post('/api/login', credentials);
	
	if (response.ok) {
		// Log in successful. Save store and redirect to user page.
		let json = await response.json();
		
		let { session: { jwt, expire }, ...data } = json;
		await cookies.set('sessionJWT', jwt, { expires: expire });
		dispatch({
			type: types.INIT_USER,
			payload: data
		});
		dispatch(push('/home'));
	}
	else if (response.status === httpStatus.UNAUTHORIZED) {
		// Throw login error. Let redux form handle error display.
		throw new SubmissionError({
			password: 'Password incorrect or email not found.'
		});
	}
	else {
		// Unexpected error
		throw new SubmissionError({
			email: 'Unexpected error when contacting server. Please try again later.'
		});
	}
};

/**
 * Thunk action creator that commands the deletion of stored user info to log out.
 */
export const logOut = () => async dispatch => {
	await cookies.remove('sessionJWT');
	dispatch({
		type: types.CLEAR_USER
	});
	dispatch(push('/'));
};

export const createAccount = values => async dispatch => {
	let birthdate = new Date(values.birthdate);
	
	// Send a POST request to create the account.
	const response = await post('/api/createAccount', {
		...values,
		birthday: {
			year: birthdate.getFullYear(),
			month: birthdate.getMonth(),
			date: birthdate.getDate()
		}
	});
	
	if (response.ok) {
		// Account creation successful, save store and redirect to user page
		let json = await response.json();
		let { session: { jwt, expire }, ...data } = json;
		
		await cookies.set('sessionJWT', jwt, { expires: expire });
		dispatch({
			type: types.INIT_USER,
			payload: data
		});
		dispatch(push('/home'));
	}
	else if (response.status === httpStatus.CONFLICT) {
		throw new SubmissionError({
			email: 'This email has been taken.'
		});
	}
};
