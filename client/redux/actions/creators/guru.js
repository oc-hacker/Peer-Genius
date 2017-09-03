import types from '../types';
import { post } from '../request';
import { handleError, handleStore } from './utils';

import htttpStatus from 'http-status-codes';

// Redux action creators for guru actions


/**
 * Thunk action creator.
 * Fetches a guru's profile from the server.
 * @param {UUID} guruUUID the guru's UUID
 */
export const getGuruProfile = (guruUUID) => async dispatch => {
	let response = await post('/api/schedule/getPastSessions', { guruUUID });
	
	if (response.ok) {
		let guruProfile = await response.json();
		
		dispatch({
			type: types.INIT_GURU_PROFILE,
			payload: { guruProfile }
		});
	} else {
		dispatch({ type: types.UNEXPECTED_ERROR });
	}
};

/**
 * Thunk action creator.
 * Fetches a guru's reviews from the server.
 * @param guruUUID
 */
export const getGuruReviews = guruUUID => async dispatch => {
	let response = await post('/api/guru/getReviews', {
		guru: guruUUID
	});
	
	if (response.ok) {
		let { reviews } = await response.json();
		
		return await dispatch({
			type: types.INIT_GURU_REVIEWS,
			payload: {
				guruUUID,
				reviews
			}
		});
	}
	else {
		return await dispatch(handleError(response));
	}
};
