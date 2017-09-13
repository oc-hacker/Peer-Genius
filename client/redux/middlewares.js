import types from './actions/types';

const standardProps = ['type', 'payload', 'meta', 'error'];

/**
 * Redux middleware that checks to ensure that the actions are following flux standard actions.
 */
export const standardize = store => next => action => {
  if (typeof action === 'function') {
    return next(action);
  }
  for (let prop in action) {
    if (action.hasOwnProperty(prop) && !standardProps.includes(prop)) {
      console.error(`Redux action of type ${action.type} does not follow flux standard action standards.`);
      break;
    }
  }
  return next(action);
};

export const createSocketMiddleware = () => {
  let socket = null;

  return store => next => action => {
    let { type, payload } = action;

    switch (type) {
      case types.SOCKET_CONNECT: {
        // Intercept and dispatch
        socket = payload;
        break;
      }
      case types.SOCKET_EMIT: {
        socket && socket.emit(payload.event, payload.data);
        break;
      }
      case types.SOCKET_ATTACH_LISTENER: {
        socket && socket.addListener(payload.event, payload.listener);
        break;
      }
      case types.SOCKET_DETACH_LISTENER: {
        socket && socket.removeListener(payload.event, payload.listener);
        break;
      }
    }

    return next(action);
  };
};
