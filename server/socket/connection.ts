// All actions related to handing connection and online status.
import * as models from '../database/models';
import { UserInstance } from '../database/models/user';
import { UserSocket } from '../types';
import * as sequelize from 'sequelize';

import { currentSessionRegistry } from './chat';

interface Registry<V> {
	[key: string]: V;
}

/**
 * Maps user id to a list of sockets that the user has open.
 */
export const socketRegistry: Registry<UserSocket[]> = {};

/**
 * Maps the user id to user sequelize instance. This registry only maintains record of the users currently online. Once a user is offline the corresponding record will be deleted.
 */
export const onlineUsers: Registry<UserInstance> = {};

const attach = async (socket: UserSocket, userId: string) => {
	console.log('User', userId, 'connected.');
	const userInstance = await models.user.find({
		where: {
			id: userId
		},
		include: [{
			model: models.guru,
			attributes: []
		}],
		attributes: [
			'id',
			[sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'name'], // CONCAT(`firstName`, ' ', `lastName`)
			[sequelize.fn('MAX', sequelize.col('enabled')), 'isGuru'] // MAX(`enabled`) AS isGuru
		],
	}) as any;
	
	// Join a room with the user's UUID
	socket.join(userId);
	console.log(userInstance.isGuru);
	
	// If user is guru, add them to the guruOnline list
	if (userInstance.dataValues.isGuru === 1){
		console.log("GURU JOINED: " + userInstance.dataValues.id);
		socket.join('gurusOnline');
	}
	
	// Save the socket id to registry.
	socket.user = userId;
	socketRegistry[userId] = [...(socketRegistry[userId] || []), socket];
	onlineUsers[userId] = userInstance;
	// Broadcast that a user connected.
	socket.broadcast.emit('user_connect', userInstance);
	
	socket.on('disconnect', async () => {
		console.log('User', userId, 'disconnected.');
		// Remove the registry entry
		socketRegistry[userId] = socketRegistry[userId].filter(userSocket => userSocket.id !== socket.id);
		
		// Check if user is completely disconnected.
		if (socketRegistry[userId].length === 0) {
			delete onlineUsers[userId];
			socket.broadcast.emit('user_disconnect', userInstance);
		}

		// save their volunteer time if applicable
		const time = currentSessionRegistry.getSession(socket.user);
			let account = await models.account.find({
				where: {
					userId: socket.user
				}
			});
			account.time += time;
			await account.save();
	});
	
	// Send information about the users currently online
	socket.emit('update_online_users', onlineUsers);
	
};

export default { attach };
