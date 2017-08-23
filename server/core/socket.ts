import * as sio from 'socket.io';
import Socket = SocketIO.Socket;
import * as jwt from 'jsonwebtoken';

import config from './config';
import server from './server';
import { logError } from '../router/misc/utils';
import { connection } from '../socket';

export const io = sio(server);
const secret = new Buffer(config.sessionJWTKey, 'base64');

io.on('connection', async (socket: SocketIO.Socket) => {
	// Verify valid JWT
	let { jwt: token } = socket.handshake.query;
	
	try {
		let user = jwt.verify(token, secret) as { id: string };
		
		try {
			await Promise.all([
				connection.attach(socket, user.id)
			]);
		}
		catch (error) {
			console.error('Unexpected error when configuring socket connection for user', user.id);
			logError([
				'Socket configuration error:',
				error
			].join('\n'));
		}
	}
	catch (error) {
		console.warn('Unauthorized socket.io connection attempt rejected.');
	}
});