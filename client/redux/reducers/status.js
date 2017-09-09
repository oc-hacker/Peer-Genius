import deepmerge from 'deepmerge';

import types from '../actions/types';
import { status } from '../actions/network';

const defaultState = {
  init: status.INITIAL
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
    case types.INIT_START: {
      diff = {
        init: status.FETCHING
      };
      break;
    }
    case types.INIT_END: {
      diff = {
        init: status.COMPLETE
      };
      break;
    }
  }

  return deepmerge(state, diff);
};
