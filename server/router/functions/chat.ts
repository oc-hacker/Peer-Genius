import { VerifiedRequest } from '../../types';
import { Response } from 'express';
import * as httpStatus from 'http-status-codes';

import { AsyncHandler, Store } from '../../types';
import { slackConnection, newConnection } from '../../database/reference';

import * as models from '../../database/models';

interface GetMessagesRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		};
		sessionId: string;
		/** A 0-indexed page number. Defaults to 0 if not set. */
		page?: number;
	};
}

/**
 * Used to retrieve message history of a session.
 */
export const getMessages: AsyncHandler<GetMessagesRequest> = async (request, response) => {
	let { user: { id }, sessionId, page = 0 } = request.body;
	
	let [session, messages] = await Promise.all([
		models.session.find({
			where: {
				id: sessionId,
				$or: [{
					newbieId: id
				}, {
					guruId: id
				}]
			} as any
		}),
		models.message.all({
			where: {
				sessionId
			},
			limit: 25,
			offset: 25 * page,
			order: [
				['createdOn', 'DESC']
			]
		})
	]);
	
	// Security nad null check - must be querying for own session that exists
	if (!session) {
		response.status(httpStatus.BAD_REQUEST).end();
	}
	else {
		response.status(httpStatus.OK).json({
			messages
		});
	}
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
