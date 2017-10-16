import * as models from '../database/models';
import { UserSocket } from '../types';

interface Message {
	sessionId: string;
	receiverId: string;
	message: string;
}

const attach = async (socket: UserSocket, userId: string) => {
	// On message events
	socket.on('sendMessage', async (data: Message) => {
		let { sessionId, receiverId, message } = data;
		
		// Save message to database
		let messageInstance = await models.message.create({
			senderId: socket.user,
			sessionId,
			message
		});
		
		// Emit to recipient
		socket.to(receiverId).emit('receiveMessage', {
			senderId: socket.user,
			sessionId,
			message,
			timestamp: messageInstance.createdAt.toISOString()
		});
	});
};

export default { attach };
