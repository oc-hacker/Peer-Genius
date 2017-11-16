import types from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  let { type } = action;

  switch (type) {
    case types.SOCKET_CONNECT:
      return true;
    default:
      return state;
  }
};
