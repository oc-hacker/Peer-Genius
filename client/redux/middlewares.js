import types from './actions/types';

const standardProps = ['type', 'payload', 'meta', 'error'];

/**
 * Redux middleware that checks to ensure that the actions are following flux standard actions.
 */
export const standardize = store => next => action => {
  if (!action) {
    return next(action);
  }
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
  let actionQueue = [];

  return store => next => action => {
    if (!action) {
      return next(action);
    }

    let { type, payload } = action;

    switch (type) {
      case types.SOCKET_CONNECT: {
        // Intercept and dispatch
        socket = payload;
        // Run all the action backlogs
        while (true) {
          action = actionQueue.shift();
          if (!action) {
            break;
          }

          socket[action.name](...action.args);
        }
        break;
      }
      case types.SOCKET_EMIT: {
        socket && socket.emit(payload.event, payload.data);
        break;
      }
      case types.SOCKET_ATTACH_LISTENER: {
        if (socket) {
          socket.on(payload.event, payload.listener);
        }
        else {
          actionQueue.push({ name: 'on', args: [payload.event, payload.listener] });
        }
        break;
      }
      case types.SOCKET_DETACH_LISTENER: {
        if (socket) {
          socket.on(payload.event, payload.listener);
        }
        else {
          actionQueue.push({ name: 'off', args: [payload.event, payload.listener] });
        }
        break;
      }
      default: {
        break;
      }
    }

    return next(action);
  };
};
