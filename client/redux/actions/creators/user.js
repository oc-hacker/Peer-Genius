// Most user-related actions go here, such as editing profile
import httpStatus from 'http-status-codes';
import { SubmissionError } from 'redux-form';

import types from '../types';
import { post } from '../network';
import { handleError } from './utils';

export const editProfile = values => async dispatch => {
	let { birthdate, ...otherValues } = values;
	birthdate = new Date(values.birthdate);
	
	let response = await post('/api/user/edit', {
		...otherValues,
		birthday: {
			year: birthdate.getFullYear(),
			month: birthdate.getMonth(),
			date: birthdate.getDate()
		}
	});
	
	if (response.ok) {
		dispatch({
			type: types.EDIT_PROFILE,
			payload: {
				...otherValues,
				birthdate: {
					year: birthdate.getFullYear(),
					month: birthdate.getMonth(),
					date: birthdate.getDate()
				}
			}
		});
	}
	else {
		dispatch(handleError(response));
	}
};
