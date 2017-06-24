import { types } from '../../reference/actionTypes.js';

import store from '../store.js';

/**
 * Reducer for the success object in the Redux store.
 */
export default function success(state={
	show: false,
	text: 'Success!'
}, action) {
	switch (action.type) {
		case types.CLOSE_SUCCESS: {
			// Reset the text and close the success dialog.
			return {
				show: false,
				text: 'Success!'
			};
		}
		default: {
			switch (action.status) {
				case types.SUCCESS: {
					if (action.successText) {
						// If a successText is supplied with an successful action, open the success dialog
						setTimeout(() => {
							// Close the dialog after one second
							store.dispatch({type: types.CLOSE_SUCCESS});
						}, 1000);
						return {
							show: true,
							text: action.successText
						}
					} else {
						return state;
					}
				}
				default:
					return state;
			}
		}
	}
}