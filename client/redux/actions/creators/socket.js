// Code for handling various info to be sent and received over sockets.
import io from 'socket.io-client';

import types from '../types';
import { serverURL } from '../../../config';

/**
 * Normal action creator.
 * Establishes a socket.io connection with server.
 */
export const socketConnect = id => {
	let socket = io(`${serverURL}?id=${id}`);
	
	return {
		type: types.SOCKET_CONNECT,
		payload: {
			socket
		}
	};
};
