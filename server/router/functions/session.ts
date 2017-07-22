import * as httpStatus from 'http-status-codes';
import { pick } from 'lodash';

import * as models from '../../database/models';

import { NextFunction, Response } from 'express';
import { VerifiedRequest } from '../../types';

interface CreateSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		startTime: Date,
		/**
		 * The time at which the session will end. Does not have to be set.
		 */
		endTime?: Date
	}
}

export const create = async (request: CreateSessionRequest, response: Response) => {
	// TODO should the mentee be creating sessions, or the mentor, or both?
	// Mentor determines when session starts/ends
	// May stop before original schedule, max 15 min overtime
};

// TODO find sessions

interface ReviewSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		/**
		 * The ID of the session
 		 */
		session: string,
		/**
		 * Rating as a number between 1 and 5 (inclusive)
		 */
		rating: number,
		comment?: string
	}
}

export const review = async (request: ReviewSessionRequest, response: Response) => {
	let session = await models.session.find({
		where: {
			id: request.body.session,
			mentee: request.body.user.id
		}
	});
	
	// TODO once a review has been recorded should it be editable?
	// Yes.
	// Has to give a review
	// Has to review right away
	// If review pending take mentee to review page upon login
	if (!session) {
		response.status(httpStatus.BAD_REQUEST).end();
	}
	else {
		await session.update(pick(request.body, ['rating', 'comment']));
		await session.save();
		response.status(httpStatus.OK);
	}
};