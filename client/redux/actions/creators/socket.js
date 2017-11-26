// Code for handling various info to be sent and received over sockets.
import io from 'socket.io-client';

import types from '../types';

import { serverURL } from '../../../config';
import { selectUserId } from '../../selectors/user';

import { push } from 'react-router-redux';
import ffmpeg from 'ffmpeg.js';
import fs from 'fs';

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
  socket.on('newSession', (newRequest) => {
    dispatch(newSession(newRequest));
    // We can assume it's a newbie because socket doesn't push messages to their sender
    dispatch(push('/newbie/sessions/:' + newRequest));
  });
  socket.on('receiveNewVideoChunk', (videoChunk) => {
    dispatch({ type: types.NEW_VIDEO_CHUNK });
    let data = new Uint8Array(videoChunk);
    fs.writeFileSync('newChunk.mp4', videoChunk);
    let filesList = "file 'currentChunk.mp4'\nfile 'newChunk.mp4'";
    fs.writeFileSync('concatList.txt', filesList);
    let result = ffmpeg({
      MEMFS: [{name: 'newChunk.mp4', data: data}],
      arguments: ['-f', 'concat', '-i', 'concatList.txt', '-c', 'copy', 'currentChunk.mp4'],
      stdin: function() {}
    });

    let outFile = result.MEMFS[0];
    fs.writeFileSync(outFile.name, Buffer(outFile.data));
  })
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

const acceptSession = newRequest => ({
  type: types.INIT_SESSION,
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
