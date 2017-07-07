import { types } from '../../reference/actionTypes.js';

/**
 * Reducer for userInfo object in the Redux store.
 */
export default function userInfo(state={}, action) {
	switch(action.type) {
		case types.INIT_USER_INFO: {
			// Initialize the userInfo object using the provided object
			return action.userInfo;
		}
		case types.UPDATE_USER_INFO: {
			// Update the supplied parts of userInfo
			return {
				... state,
				...action.newInfo
			}
		}
		case types.RESET: {
			// Reset userInfo to an empty object
			return {};
		}
		default: {
			return state;
		}
	}
}
