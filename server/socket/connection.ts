// All actions related to handing connection and online status.
import * as models from '../database/models';
import { subjects } from '../database/models/guru';
import { UserInstance } from '../database/models/user';
import { UserSocket } from '../types';
import * as sequelize from 'sequelize';

/**
 * Maps user id to socket id
 */
interface SocketRegistry {
	[socket: string]: UserSocket
}

export const registry: SocketRegistry = {};

const subjectOrCondition = Object.values(subjects).map(subject => ({ [subject]: true }));

const attach = async (socket: UserSocket, user: string) => {
	// Save the socket id to registry
	socket.user = user;
	registry[user] = socket;
	console.log('User', user, 'connected.');

	socket.on('disconnect', () => {
		delete registry[user];
		console.log('User', user, 'disconnected.');
	});

	const getOnlineUsers = async () => {
		let startTime = Date.now();
		let onlineGurus = await models.guru.all({
			where: {
				user: {
					$in: Object.values(socket.nsp.sockets) // Get all sockets
						.map((socket: UserSocket) => socket.user) // Get all user ids
						.filter(user => user) // Ensure that the values are not null
				},
				$or: subjectOrCondition
			} as any // TODO Sequelize TypeScript does not allow nested where attributes?
		}).then(gurus =>
			Promise.all(
				gurus.map(guru => models.user.find({
					where: { id: guru.user },
					attributes: [
						[sequelize.fn(
							'CONCAT',
							sequelize.col('firstName'), ' ', sequelize.col('lastName')
						), 'name']
					]
				}))
			)
		);

		let endTime = Date.now();

		// TODO is this the best way to find all online users?
		console.log(`[Performance Monitor] Online users list compiled in ${endTime - startTime}ms`);
		return {
			onlineGurus
		};
	};

	socket.broadcast.emit('update_online_users', await getOnlineUsers());

	socket.on('disconnect', async () => {
		socket.broadcast.emit('update_online_users', await getOnlineUsers());
	});
};

export default { attach };
