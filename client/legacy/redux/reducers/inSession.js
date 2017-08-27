import types from '../actions/types';
import status from '../../reference/status';

/**
 * Reducer for the inSession field in the Redux store.
 */
export default function inSession(state=-1, action) {
	switch (action.type) {
		case types.LOGIN:
		case types.VERIFY_SESSION:
		case types.REFRESH_SESSION:
			switch (action.status) {
				case status.SUCCESS: {
					// On successful login/session refresh, set inSession to 1
					return 1;
				}
				case status.FAILURE: {
					// On failed login/session refresh, set inSession to 0
					return 0;
				}
				default: 
					return state;
			}
		case types.LOGOUT: {
			// Set inSession to 0 on log out
			return 0;
		}
		default:
			return state;
	}
};