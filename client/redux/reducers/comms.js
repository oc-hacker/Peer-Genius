import types from '../actions/types';
import status from '../../reference/status';

const defaultState = {};

export default (state = defaultState, action) => {
	switch (action.type) {
		case types.INIT_COMMUNICATIONS:
			return action.communications;
		case types.UPDATE_COMMUNICATIONS:
			if (action.status === status.SUCCESS) {
				return action.communications;
			}
			break;
		default:
			return state;
	}
};