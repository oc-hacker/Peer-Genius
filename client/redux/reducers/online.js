// Tracks all online users.
import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = {}; // A map from user id to user instance.

export default (state = defaultState, action) => {
  // eslint-disable-next-line
  let { type, payload, meta, error } = action;
  let diff = {};

  // Generally reducers will use `diff` to apply changes to state. Occasionally the reducer may return state directly to, for example, remove a certain attribute.
  switch (type) {
    default: {
      return state;
    }
    case types.UPDATE_ONLINE_USERS: {
      return payload;
    }
    case types.USER_CONNECT: {
      diff = {
        [payload.id]: payload
      };
      break;
    }
    case types.USER_DISCONNECT: {
      if (payload.id !== meta.currentUserId) {
        let { [payload.id]: _, ...newState } = state;
        return newState;
      }
      else {
        return state;
      }
    }
  }

  return deepmerge(state, diff);
}
