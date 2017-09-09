import deepmerge from 'deepmerge';
import types from '../actions/types';

// PeerGenius session reducer

const defaultState = {
  pastSessions: {},
  sessionRequests: [],
};

export default (state = defaultState, action) => {
  // eslint-disable-next-line
  let { type, payload, meta, error } = action;
  let diff = {};

  switch (type) {
    default: {
      return state;
    }
    case types.INIT_PAST_SESSIONS: {
      diff = payload;
      break;
    }
    case types.INIT_NEW_SESSION_REQUEST: {
      diff = {
        sessionRequests: [...state.sessionRequests, payload]
      };
      break;
    }
  }

  return deepmerge(state, diff || {});
};
