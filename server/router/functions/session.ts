import * as httpStatus from 'http-status-codes';
import { pick, omit } from 'lodash';

import * as models from '../../database/models';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';
import { newConnection } from '../../database/reference';

/*
Workflow:
request - Mentees post here to send requests to mentors
check - Mentors post here to check if there are sessions needing a mentor
accept - Mentors post here to accept a session
start - Mentors post here to start a session
end - Mentors post here to stop a session
review - Mentees post here to review a session
 */

interface RequestSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		subject: string,
		scheduledStart: Date,
		scheduledEnd: Date
	}
}

export const request = async (request: RequestSessionRequest, response: Response) => {
	let { user: { id }, scheduledStart, scheduledEnd } = request.body;
	
	await models.session.create({
		mentee: id,
		scheduledStart,
		scheduledEnd
	});
	
	response.status(200).end();
};

export const check = async (request: VerifiedRequest, response: Response) => {
	let { user: { id } } = request.body;
	
	let mentor = await models.mentor.find({
		where: {
			user: {
				id
			}
		}
	});
	let subjects = Object.keys(omit(mentor, 'user')).filter(subject => mentor[ subject ]);
	
	const connection = await newConnection();
	// language=MYSQL-SQL
	let results = await connection.asyncQuery(
		`SELECT id, mentee, subject, startTime, endTime FROM sessions
WHERE mentor IS NULL
AND subject IN (${subjects.map(connection.escape).join(', ')})
ORDER BY startTime ASC`
	);
	connection.release();
	
	response.status(httpStatus.OK).json({
		requests: results
	})
};

interface SessionInfoRequest extends VerifiedRequest {
	body: {
		user: {
			id
		},
		session: string
	}
}

export const info = async (request: SessionInfoRequest, response: Response) => {
	let result = await models.session.find({
		where: {
			id: request.body.session
		}
	});
	
	response.status(httpStatus.OK).json({
		session: result
	});
};

interface AcceptSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		/** ID of session */
		session: string
	}
}

export const accept = async (request: AcceptSessionRequest, response: Response) => {
	let [ affectedRowCount ] = await models.session.update({
		mentor: request.body.user.id
	}, {
		where: {
			id: request.body.session,
			mentor: null
		},
		limit: 1
	});
	
	if (affectedRowCount > 0) {
		// Changed a row, successful
		let session = await models.session.find({
			where: {
				id: request.body.session
			}
		});
		
		// Find compatible comm methods and send it to client.
		let mentorComms = await models.communication.find({
			where: {
				user: request.body.user.id
			}
		});
		let menteeComms = await models.communication.find({
			where: {
				user: session.mentee
			}
		});
		
		let communications = pick(menteeComms, Object.keys(mentorComms));
		
		response.status(httpStatus.OK).json({
			communications
		});
	}
	else {
		response.status(httpStatus.CONFLICT).end();
	}
};

// TODO start, end
// TODO missing review blocks future requests.

interface ReviewSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		/** ID of session */
		session: string,
		/** Number between 1 and 5 (inclusive) */
		rating: number,
		comment?: string
	}
}

// Used for both initial reviews and editing reviews.
export const review = async (request: ReviewSessionRequest, response: Response) => {
	let { user, session: sessionId, rating, comment } = request.body;
	
	let session = await models.session.find({
		where: {
			id: sessionId,
			mentee: user.id
		}
	});
	
	// Security check
	if (!session) {
		response.status(httpStatus.BAD_REQUEST).end();
		return;
	}
	
	await session.update({
		rating,
		comment
	});
	await session.save();
	response.status(httpStatus.OK).end();
};