import types from '../actions/types';

const defaultState = [];

export default (state = defaultState, action) => {
	switch (action.type) {
		case types.INIT_COMMUNICATION_METHODS:
			return action.methods;
		default:
			return state;
	}
}
