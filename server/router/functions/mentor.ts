import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { communicationMethods } from '../../database/models/communication';
import { newConnection } from '../../database/reference';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';

interface FindMentorRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		/**
		 * The subject that the mentor will be tutoring in.
		 */
		subject: string,
		/**
		 * The preferred communications options. If null, the server will use mentee's comm preferences.
		 */
		communications?: Array<string>,
		time?: Date // Availability is not done yet. Eventually this will indicate when the participant wants the mentor, null to indicate right now.
	}
}

/**
 *
 * @param {FindMentorRequest} request
 * @param {e.Response} response
 */
export const find = async (request: FindMentorRequest, response: Response) => {
	let { user: { id }, subject, communications, time } = request.body;
	
	// If communication methods are not specified, use mentee's communication preferences.
	if (!communications) {
		communications = [];
		let menteeCommunications = await models.communication.find({
			where: {
				user: id
			}
		});
		for (let method of communicationMethods) {
			if (menteeCommunications[ method ]) {
				communications.push(method)
			}
		}
	}
	if (!time) {
		time = new Date(Date.now());
	}
	
	// Query the database
	const connection = await newConnection(true);
	// language=MYSQL-SQL
	let mentors = await connection.asyncQuery(`SELECT firstName, lastName, ${communicationMethods.join(', ')} FROM users
INNER JOIN communications ON communications.user = users.id
INNER JOIN mentors ON mentors.user = users.id
WHERE mentors.${connection.escapeId(subject)} = 1
AND (${communications.map(method => `${connection.escapeId(method)} = 1`).join(' OR ')})`); // TODO availability and time restriction
	// Change binary boolean representation in DB to boolean values
	for (let mentor of mentors) {
		for (let method of communicationMethods) {
			mentor[ method ] = Boolean(mentor[ method ])
		}
	}
	
	// Return results
	console.log(mentors);
	response.status(httpStatus.OK).json({
		mentors
	})
};