// @deprecated switching to socket.io for session stuff
import * as httpStatus from 'http-status-codes';
import { omit, pick } from 'lodash';

import * as models from '../../database/models';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';
import { newConnection } from '../../database/reference';

/*
Workflow:
request - Newbies post here to send requests to gurus
check - Gurus post here to check if there are sessions needing a guru
accept - Gurus post here to accept a session
start - Gurus post here to start a session
end - Gurus post here to stop a session
review - Newbies post here to review a session
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

/**
 * @deprecated Moving to socket.io handling
 */
export const request = async (request: RequestSessionRequest, response: Response) => {
	let { user: { id }, scheduledStart, scheduledEnd } = request.body;

	await models.session.create({
		newbie: id,
		scheduledStart,
		scheduledEnd
	});

	response.status(200).end();
};

/**
 * @deprecated Moving to socket.io handling
 */
export const check = async (request: VerifiedRequest, response: Response) => {
	let { user: { id } } = request.body;

	let guru = await models.guru.find({
		where: {
			user: id
		}
	});
	let subjects = Object.keys(omit(guru, 'user')).filter(subject => guru[subject]);

	const connection = await newConnection();
	// language=MYSQL-SQL
	let results = await connection.asyncQuery(
		`SELECT id, newbie, subject, startTime, endTime FROM sessions
WHERE guru IS NULL
AND subject IN (${subjects.map(connection.escape).join(', ')})
ORDER BY startTime ASC`
	);
	connection.release();

	response.status(httpStatus.OK).json({
		requests: results
	});
};

interface SessionInfoRequest extends VerifiedRequest {
	body: {
		user: {
			id
		},
		session: string
	}
}

/**
 * @deprecated Moving to socket.io handling
 */
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

/**
 * @deprecated Moving to socket.io handling
 */
const accept = async (request: AcceptSessionRequest, response: Response) => {
	let [affectedRowCount] = await models.session.update({
		guru: request.body.user.id
	}, {
		where: {
			id: request.body.session,
			guru: null
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
		let guruComms = await models.communication.find({
			where: {
				user: request.body.user.id
			}
		});
		let newbieComms = await models.communication.find({
			where: {
				user: session.newbie
			}
		});

		let communications = pick(newbieComms, Object.keys(guruComms));

		response.status(httpStatus.OK).json({
			communications
		});
	}
	else {
		response.status(httpStatus.CONFLICT).end();
	}
};


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
/**
 * @deprecated Moving to socket.io handling
 */
export const review = async (request: ReviewSessionRequest, response: Response) => {
	let { user, session: sessionId, rating, comment } = request.body;

	let session = await models.session.find({
		where: {
			id: sessionId,
			newbie: user.id
		}
	});

	// Null check
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
