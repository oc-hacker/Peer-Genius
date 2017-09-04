// All actions related to handing connection and online status.
import * as models from '../database/models';
import { subjects } from '../database/models/guru';
import { UserInstance } from '../database/models/user';
import { UserSocket } from '../types';
import * as sequelize from 'sequelize';

interface Registry<V> {
	[key: string]: V;
}

export const registry: Registry<UserSocket> = {};

export const onlineUsers: Registry<UserInstance> = {};

// const subjectOrCondition = Object.values(subjects).map(subject => ({ [subject]: true }));

const attach = async (socket: UserSocket, user: string) => {
	console.log('User', user, 'connected.');
	const userInstance = await models.user.find({
		where: {
			id: user
		},
		attributes: [
			'id',
			[sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'name'] // CONCAT(`firstName`, ' ', `lastName`)
		]
	});
	
	// Save the socket id to registry. Delete registry entries on disconnect.
	socket.user = user;
	registry[user] = socket;
	onlineUsers[user] = userInstance;
	
	socket.on('disconnect', () => {
		console.log('User', user, 'disconnected.');
		delete registry[user];
		delete onlineUsers[user];
	});
	
	// Send information about the users currently online
	socket.emit('update_online_users', onlineUsers);
	
	// Broadcast that a user connected. Boradcast that a user disconnected on disconnect.
	socket.broadcast.emit('user_connect', userInstance);
	
	socket.on('disconnect', async () => {
		socket.broadcast.emit('user_disconnect', userInstance);
	});
};

export default { attach };
