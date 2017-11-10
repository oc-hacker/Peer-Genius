import deepmerge from 'deepmerge';
import types from '../actions/types';

// PeerGenius session reducer

const defaultState = {
  pastSessions: {},
  sessionRequests: [],
  session: {},
  currentRequests: []
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
        currentRequests: [...state.currentRequests, payload]
      };
      break;
    }
    case types.INIT_SESSION: {
      diff = {
        session: payload
      }
      break;
    }
    case types.INIT_CURRENT_REQUESTS: {
      diff = {
        currentRequests: payload
      }
    }
  }

  return deepmerge(state, diff || {});
};
