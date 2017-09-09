import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = {
  ignoreUnexpectedError: false,
  unexpectedError: false
};

export default (state = defaultState, action) => {
  // eslint-disable-next-line
  let { type, payload, meta, error } = action;
  let diff = {};

  // Generally reducers will use `diff` to apply changes to state. Occassionally the reducer may return state directly to, for example, remove a certain attribute.
  switch (type) {
    default: {
      return state;
    }
    case types.UNEXPECTED_ERROR: {
      diff = {
        unexpectedError: true
      };
      break;
    }
    case types.CLOSE_UNEXPECTED_ERROR: {
      diff = {
        unexpectedError: false
      };
      break;
    }
    case types.IGNORE_UNEXPECTED_ERROR: {
      diff = {
        ignoreUnexpectedError: true
      };
      break;
    }
  }

  return deepmerge(state, diff);
}
