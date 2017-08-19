import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = {};

export default (state = defaultState, action) => {
	let { type, payload, meta, error } = action;
	let diff = {};
	
	// Generally reducers will use `diff` to apply changes to state. Occassionally the reducer may return state directly to, for example, remove a certain attribute.
	switch (type) {
		default: {
			return state;
		}
		case types.INIT_USER: {
			diff = payload.communication;
			break;
		}
		case types.CLEAR_USER: {
			return defaultState;
		}
	}
	
	return deepmerge(state, diff || {})
}
