// Actions related to user's communication settings go here.
import { post } from '../request';
import types from '../types';
import { handleError } from './utils';

export const editCommunication = values => async dispatch => {
	let response = await post('/api/communication/edit', values);
	
	if (response.ok) {
		dispatch({
			type: types.EDIT_COMMUNICATIONS,
			payload: values
		});
	}
	else {
		dispatch(handleError(response));
	}
};