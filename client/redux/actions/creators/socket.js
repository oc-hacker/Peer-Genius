// Code for handling various info to be sent and received over sockets.
import io from 'socket.io-client';

import types from '../types';

const serverURL = process.env.SERVER_URL;

/**
 * Normal action creator.
 * Establishes a socket.io connection with server.
 */
export const socketConnect = jwt => {
	let socket = io(`${serverURL}?jwt=${jwt}`);
	
	socket.on('update_online_users', console.log);
	
	return {
		type: types.SOCKET_CONNECT,
		payload: socket
	};
};
