// All account related things go here. Mostly concerned with account setting editing. createAccount is in session creators.
import httpStatus from 'http-status-codes';
import { SubmissionError } from 'redux-form';

import types from '../types';
import { post } from '../request';
import { handleError } from './utils';

export const editEmail = values => async dispatch => {
	let { email, password } = values;
	
	let response = await post('/api/account/edit', {
		password,
		email
	});
	
	if (response.ok) {
		// Edit successful, need to verify
		// TODO
	}
};

export const editPassword = values => async dispatch => {
	let { oldPassword, newPassword } = values;
	
	let response = await post('/api/account/edit', {
		password: oldPassword,
		newPassword
	});
	if (!response.ok) {
		if (response.status === httpStatus.UNAUTHORIZED) {
			// Wrong password
			throw new SubmissionError({
				oldPassword: 'Incorrect password.'
			});
		}
		else {
			dispatch(handleError(response));
		}
	}
};


