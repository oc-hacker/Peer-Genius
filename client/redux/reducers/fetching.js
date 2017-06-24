import { types } from '../../reference/actionTypes.js';

/**
 * Reducer for the 'fetching' field in the Redux store.
 */
export default function fetching(state=false, action) {
	switch(action.type) {
		case types.REFRESH_SESSION:
		case types.GET_HOURS:
		case types.GET_NEW_NOTIFICATIONS:
		case types.READ_NOTIFICATIONS:
			// Don't set fetching for refreshing the session or getting hours and notifications
			return state;
		
		case types.START_FORM_CHECK:
			// Set fetching to true for refreshing forms and starting form checks
			return true;
		
		case types.END_FORM_CHECK:
			// Set fetching to false after forms have finished loading and when form checks are ended
			return false;
	}

	switch (action.status) {
		case types.REQUEST:
			// Set fetching to true for all requests
			return true;
		case types.SUCCESS:
		case types.FAILURE:
			// Set fetching to false for all successes and failures
			return false;
		default:
			return state;
	}
}