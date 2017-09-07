// All actions related to handing connection and online status.
import * as models from '../database/models';
import { subjects } from '../database/models/guru';
import { UserInstance } from '../database/models/user';
import { UserSocket } from '../types';
import * as sequelize from 'sequelize';

interface Registry<V> {
	[key: string]: V;
}

/**
 * Maps user id to a list of sockets (their ids) that the user has open.
 * @type {{}}
 */
export const registry: Registry<UserSocket[]> = {};

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
	
	// Save the socket id to registry.
	socket.user = user;
	registry[user] = [...(registry[user] || []), socket];
	onlineUsers[user] = userInstance;
	// Broadcast that a user connected.
	socket.broadcast.emit('user_connect', userInstance);
	
	socket.on('disconnect', () => {
		console.log('User', user, 'disconnected.');
		// Delete registry entry when user fully disconnects
		registry[user] = registry[user].filter(userSocket => userSocket.id !== socket.id);
		// Check if user is completely disconnected.
		if (registry[user].length === 0) {
			delete onlineUsers[user];
			// Broadcast that a user disconnected.
			socket.broadcast.emit('user_disconnect', userInstance);
		}
	});
	
	// Send information about the users currently online
	socket.emit('update_online_users', onlineUsers);
	
};

export default { attach };
