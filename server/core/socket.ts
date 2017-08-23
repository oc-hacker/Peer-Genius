import * as sio from 'socket.io';

import server from './server';

const io = sio(server);

io.on('connection', socket => {
	let { id } = socket.handshake.query;
	console.log('User', id, 'connected.');
	
	socket.on('disconnect', () => {
		console.log('User', id, 'disconnected.');
	});
});
