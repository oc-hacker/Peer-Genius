import message from '../database/models/message';
import { Message } from './connection';

/**
 * Sends a message to the given user.
 * @param {Object} data the data sent by the client. Contains the message and user to send it to.
 * @param {UUID} id the user's UUID
 * @param {SocketIO.Socket} socket the socket object (so we can call emit() on it)
 */
export const sendMessage = async (data: Message, id: string, socket: SocketIO.Socket) => {
	let newMsg = {
		from: id,
		to: data.to,
		message: data.message,
		createdAt: new Date()
	};
	
	//save the message to DB
	await message.upsert(newMsg);
	
	//send the message to the recipient
	socket.to(data.to).emit('receiveMessage', newMsg);
};

export default { sendMessage };
