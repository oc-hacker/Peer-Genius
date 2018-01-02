import * as models from '../database/models';
import { UserSocket } from '../types';
import { currentId } from 'async_hooks';

interface Message {
	sessionId: string;
	receiverId: string;
	message: string;
}

interface UpdateVolunteerTime {
	action: string;
}

class SessionEntry {
	start: Date;
	user: string;
}

class CurrentSessionRegistry {
	constructor() {
		this.sessions = [];
	}

	sessions: Array<SessionEntry>;

	getSession(user: string): number {
		for (let i = 0; i < this.sessions.length; i++) {
			if (this.sessions[i].user === user) {
				const session = this.sessions[i];
				const end = new Date();
				const out = this.sessions.splice(i, 1)[0];
				// calculate difference
				return end.getTime() - out.start.getTime();
			}
		}
		return 0;
	}
}

export let currentSessionRegistry = new CurrentSessionRegistry();

const attach = async (socket: UserSocket) => {
	// On message events
	socket.on('sendMessage', async (data: Message) => {
		let { sessionId, receiverId, message } = data;
		console.log(sessionId);

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

	// tracking volunteer time for gurus
	socket.on('updateVolunteerTime', async (data: UpdateVolunteerTime) => {
		let { action } = data;
		console.log("Updating volunteer time status for user " + socket.user);

		if (action === 'idle') {
			const time = currentSessionRegistry.getSession(socket.user);
			if (time <= (1000 * 60 * 60 * 8 /* 8 hours */)) {
				let account = await models.account.find({
					where: {
						userId: socket.user
					}
				});
				account.time += time;
				await account.save();
			}
		} else {
			let session = new SessionEntry();
			session.start = new Date();
			session.user = socket.user;
			currentSessionRegistry.sessions.push(session);
		}
	})
};

export default { attach };
