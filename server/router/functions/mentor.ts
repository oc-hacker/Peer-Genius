import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { communicationMethods } from '../../database/models/communication';
import { newConnection } from '../../database/reference';

import { NextFunction, Response } from 'express';
import { VerifiedRequest } from '../../types';

interface FindMentorRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		subject: string,
		communications?: Array<string>, // If null, the server will automatically match mentee's comm preferences with mentor's comm preferences
		time?: Date // Availability is not done yet. Eventually this will indicate when the participant wants the mentor, null to indicate right now.
	}
}

/**
 *
 * @param {FindMentorRequest} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
export const find = async (request: FindMentorRequest, response: Response, next: NextFunction) => {
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
		// TODO use time and availability to select mentors
	}
	
	// Query the database
	const connection = await newConnection(true);
	// language=MYSQL-SQL
	let mentors = await connection.query(`SELECT firstName, lastName, ${communicationMethods.join(', ')} FROM users
INNER JOIN communications ON communications.user = users.id
WHERE (${communications.map(method => `${method} = 1`).join(' OR ')})`); // TODO availability and time restriction
	// Change binary boolean representation in DB to boolean values
	for (let mentor of mentors) {
		for (let method of communicationMethods) {
			mentor[method] = Boolean(mentor[method])
		}
	}
	
	// Return results
	console.log(mentors);
	response.status(httpStatus.OK).json({
		mentors
	})
};