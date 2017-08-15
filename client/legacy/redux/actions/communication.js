import types from './types';
import status from '../../reference/status';
import { get, post } from '../../reference/api';

export const initCommMethods = () => async dispatch => {
	let response = await get('/loc/comms.json');
	let json = await response.json();
	
	let methods = [];
	for (let key in json) {
		// noinspection JSUnfilteredForInLoop
		methods.push({
			name: key,
			checkLabel: json[key],
			textLabel: key === 'imessage' ? 'Phone number' : 'Username' // TODO a better way?
		});
	}
	
	dispatch({
		type: types.INIT_COMMUNICATION_METHODS,
		methods
	});
};

/**
 * Normal action creator for initializing local store of communication preferences
 *
 * @param communications
 */
export const initComms = communications => ({
	type: types.INIT_COMMUNICATIONS,
	communications
});

/**
 * Thunk action creator.
 * @param values An object whose keys are programmatic representations of the communication methods, and values are either null or user's username/number in those communication apps.
 */
export const updateComms = values => async dispatch => {
	dispatch({
		type: types.UPDATE_COMMUNICATIONS,
		status: status.REQUEST
	});
	
	let response = await post('/api/communication/update', values);
	
	if (response.ok) {
		dispatch({
			type: types.UPDATE_COMMUNICATIONS,
			status: status.SUCCESS,
			communications: values
		});
	}
	else {
		dispatch({
			type: types.UPDATE_COMMUNICATIONS,
			status: status.FAILURE
		});
	}
};
