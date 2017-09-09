import deepmerge from 'deepmerge';
import types from '../actions/types';

// PeerGenius session reducer

const defaultState = {
  pastSessions: {},
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
  }

  return deepmerge(state, diff || {});
};
