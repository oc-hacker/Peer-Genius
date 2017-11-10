import * as sio from 'socket.io';
import * as jwt from 'jsonwebtoken';

import server from './server';
import { logError } from '../router/misc/utils';
import { connection, chat, peer } from '../socket';
import { UserSocket } from '../types';

const { JWT_SECRET } = process.env;

export const io = sio(server);
const secret = new Buffer(JWT_SECRET, 'base64');

io.on('connection', async (socket: UserSocket) => {
	// Verify valid JWT
	let { jwt: token } = socket.handshake.query;
	
	try {
		let user = jwt.verify(token, secret) as { id: string };
		
		try {
			await Promise.all([
				connection.attach(socket, user.id),
				chat.attach(socket),
				peer.attach(socket)
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
