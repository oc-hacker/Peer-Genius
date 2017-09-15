import { VerifiedRequest } from '../../types';
import { Response } from 'express';
import * as httpStatus from 'http-status-codes';

import { AsyncHandler, Store } from '../../types';
import { slackConnection, newConnection } from '../../database/reference';

import message, { MessageInstance } from '../../database/models/message';

interface GetMessagesRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		};
		participant: string;
		indexStart: number;
	};
}

/**
 * Gets indexStart to indexStart + 50 messages for a user. indexStart should only be incremented in 25's.
 * @param request
 * @param response
 * Returns messages between the two users, sorted by time.
 */
export const getMessages = async (request: GetMessagesRequest, response: Response) => {
	let { user: { id }, participant, indexStart } = request.body;
	
	let messages1 = await message.findAll({
		where: {
			from: id,
			to: participant
		},
		raw: true,
		offset: indexStart,
		limit: 25
	});
	let messages2 = await message.findAll({
		where: {
			from: participant,
			to: id
		},
		raw: true,
		offset: indexStart,
		limit: 25
	});
	let messages = messages1.concat(messages2);
	
	//sort messages by time
	messages.sort((a: MessageInstance, b: MessageInstance) => {
		return (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime();
	});
	response.status(httpStatus.OK).json(messages);
};

/**
 * Gets the 10-20 most recent users that the user has conversed with.
 * @param request
 * @param response
 */
export const getConversations = async (request: VerifiedRequest, response: Response) => {
	let { user: { id } } = request.body;
	
	let connection = await newConnection();
	let conversations1 = await connection.query('SELECT message.to, message.from, message.message, MAX(createdAt) FROM message GROUP BY message.to WHERE message.to=\''
		+ id + '\' LIMIT 10;', { raw: true });
	let conversations2 = await connection.query('SELECT message.to, message.from, message.message, MAX(createdAt) FROM message GROUP BY message.from WHERE message.from=\''
		+ id + '\' LIMIT 10;', { raw: true });
	let conversations = conversations1.concat(conversations2);
	
	connection.release();
	response.status(httpStatus.OK).json(conversations);
};
