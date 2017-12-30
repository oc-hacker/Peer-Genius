import * as jwt from 'jsonwebtoken';
import { seio } from './server';
import { logError } from '../router/misc/utils';
import { connection, chat, webrtc } from '../socket';
import { UserSocket } from '../types';

const { JWT_SECRET } = process.env;

const secret = new Buffer(JWT_SECRET, 'base64');

// prevent stuff from breaking
export const io = seio;

export const onConnect = async (socket: UserSocket) => {
	console.log("CONNECTION");
	// Verify valid JWT
	let { jwt: token } = socket.handshake.query;
	
	try {
		let user = jwt.verify(token, secret) as { id: string };
		
		try {
			await Promise.all([
				connection.attach(socket, user.id),
				chat.attach(socket),
				webrtc.attach(socket)
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
};
