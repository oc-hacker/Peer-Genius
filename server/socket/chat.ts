import message from '../database/models/message';
import { Message } from './connection';
import { UserSocket } from '../types';

const attach = async (socket: SocketIO.Socket, userId: string) => {
	// On message events
	socket.on('sendMessage', async (data: Message) => {
		let newMsg = {
			from: userId,
			to: data.to,
			message: data.message,
			createdAt: new Date()
		};
		
		//save the message to DB
		await message.upsert(newMsg);
		
		//send the message to the recipient
		socket.to(data.to).emit('receiveMessage', newMsg);
	});
};

export default { attach };
