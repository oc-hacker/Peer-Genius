// Code for handling various info to be sent and received over sockets.
import io from 'socket.io-client';

import types from '../types';

import { serverURL } from '../../../config';
import { selectUserId } from '../../selectors/user';

/**
 * Thunk action creator.
 * Establishes a socket.io connection with server.
 */
export const socketConnect = jwt => async (dispatch, getState) => {

  let socket = io(`${serverURL}?jwt=${jwt}`);

  dispatch({
    type: types.SOCKET_CONNECT,
    payload: socket
  });

  // Attach listeners
  socket.on('update_online_users', onlineUsers => dispatch(updateOnlineUsers(onlineUsers)));
  socket.on('user_connect', newUser => dispatch(userConnect(newUser)));
  socket.on('user_disconnect', disconnectedUser => dispatch(userDisconnect(disconnectedUser, selectUserId(getState()))));
  socket.on('newSession', newRequest => dispatch(newSession(newRequest)));
};

/**
 * Normal action creator.
 * Creates an action that instructs the socket to emit an event.
 */
export const socketEmit = (event, data) => ({
  type: types.SOCKET_EMIT,
  payload: {
    event,
    data
  }
});

/**
 * Normal action creator.
 * Creates an action that attaches the listener to the socket.
 */
export const socketAttachListener = (event, listener) => ({
  type: types.SOCKET_ATTACH_LISTENER,
  payload: {
    event,
    listener
  }
});

export const socketDetachListener = (event, listener) => ({
  type: types.SOCKET_DETACH_LISTENER,
  payload: {
    event,
    listener
  }
});

/**
 * Normal action creator.
 * Signals initialization of online users.
 */
const updateOnlineUsers = onlineUsers => ({
  type: types.UPDATE_ONLINE_USERS,
  payload: onlineUsers
});

const newSession = newRequest => ({
  type: types.INIT_NEW_SESSION_REQUEST,
  payload: newRequest
});

/**
 * Normal action creator.
 * Signals a user connecting.
 */
const userConnect = newUser => ({
  type: types.USER_CONNECT,
  payload: newUser
});

/**
 * Normal action creator.
 * Signals a user disconnecting.
 */
const userDisconnect = (disconnectedUser, currentUserId) => ({
  type: types.USER_DISCONNECT,
  payload: disconnectedUser,
  meta: {
    currentUserId
  }
});
