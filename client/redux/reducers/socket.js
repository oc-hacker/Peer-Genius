import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = null;

export default (state = defaultState, action) => {
	let { type, payload, meta, error } = action;
	
	// Generally reducers will use `diff` to apply changes to state. Occassionally the reducer may return state directly to, for example, remove a certain attribute.
	switch (type) {
		default: {
			return state;
		}
		case types.SOCKET_CONNECT: {
			return payload.socket;
		}
	}
}
