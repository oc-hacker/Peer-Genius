// All actions related to handing connection and online status.
import * as models from '../database/models';
import { subjects } from '../database/models/guru';
import { UserInstance } from '../database/models/user';
import { UserSocket } from '../types';
import * as sequelize from 'sequelize';
import sendMessage from './chat';

interface Registry<V> {
	[key: string]: V;
}

/**
 * The object for messages.
 */
export interface Message {
    to: string,
    message: string
}

/**
 * Maps user id to a list of sockets that the user has open.
 */
export const socketRegistry: Registry<UserSocket[]> = {};

/**
 * Maps the user id to user sequelize instance. This registry only maintains record of the users currently online. Once a user is offline the corresponding record will be deleted.
 */
export const onlineUsers: Registry<UserInstance> = {};

const guruCondition = subjects.map(subject => `\`guru\`.\`${subject}\``).join(' OR ');

const attach = async (socket: UserSocket, user: string) => {
	console.log('User', user, 'connected.');
	const userInstance = await models.user.find({
		where: {
			id: user
		},
		include: [{
			model: models.guru,
			attributes: []
		}],
		attributes: [
			'id',
			[sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'name'], // CONCAT(`firstName`, ' ', `lastName`)
			[sequelize.literal(guruCondition), 'isGuru'] // subject1 OR subject2 OR ... AS isGuru
		],
	});
    //join a room with the user's UUID
    socket.join(user);

	// Save the socket id to registry.
	socket.user = user;
	socketRegistry[user] = [...(socketRegistry[user] || []), socket];
	onlineUsers[user] = userInstance;
	// Broadcast that a user connected.
	socket.broadcast.emit('user_connect', userInstance);
	
	socket.on('disconnect', () => {
		console.log('User', user, 'disconnected.');
		// Remove the registry entry
		socketRegistry[user] = socketRegistry[user].filter(userSocket => userSocket.id !== socket.id);
		
		// Check if user is completely disconnected.
		if (socketRegistry[user].length === 0) {
			delete onlineUsers[user];
			socket.broadcast.emit('user_disconnect', userInstance);
		}
    });

    //handle sending messages
    socket.on('sendMessage', async (data: Message) => await sendMessage(data, user, socket));

	// Send information about the users currently online
	socket.emit('update_online_users', onlineUsers);
	
};

export default { attach };
