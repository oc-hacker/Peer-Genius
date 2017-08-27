import * as httpStatus from 'http-status-codes';
import { pick, omit } from 'lodash';

import * as models from '../../database/models';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';
import { newConnection } from '../../database/reference';

/*
Workflow:
request - Mentees post here to send requests to mentors
check - Mentors post here to check if there are lessons needing a mentor
accept - Mentors post here to accept a lesson
start - Mentors post here to start a lesson
end - Mentors post here to stop a lesson
review - Mentees post here to review a lesson
 */

interface RequestLessonRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		subject: string,
		scheduledStart: Date,
		scheduledEnd: Date
	}
}

export const request = async (request: RequestLessonRequest, response: Response) => {
	let { user: { id }, scheduledStart, scheduledEnd } = request.body;
	
	await models.lesson.create({
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
			user: id
		}
	});
	let subjects = Object.keys(omit(mentor, 'user')).filter(subject => mentor[ subject ]);
	
	const connection = await newConnection();
	// language=MYSQL-SQL
	let results = await connection.asyncQuery(
		`SELECT id, mentee, subject, startTime, endTime FROM lessons
WHERE mentor IS NULL
AND subject IN (${subjects.map(connection.escape).join(', ')})
ORDER BY startTime ASC`
	);
	connection.release();
	
	response.status(httpStatus.OK).json({
		requests: results
	})
};

interface LessonInfoRequest extends VerifiedRequest {
	body: {
		user: {
			id
		},
		lesson: string
	}
}

export const info = async (request: LessonInfoRequest, response: Response) => {
	let result = await models.lesson.find({
		where: {
			id: request.body.lesson
		}
	});
	
	response.status(httpStatus.OK).json({
		lesson: result
	});
};

interface AcceptLessonRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		/** ID of lesson */
		lesson: string
	}
}

export const accept = async (request: AcceptLessonRequest, response: Response) => {
	let [ affectedRowCount ] = await models.lesson.update({
		mentor: request.body.user.id
	}, {
		where: {
			id: request.body.lesson,
			mentor: null
		},
		limit: 1
	});
	
	if (affectedRowCount > 0) {
		// Changed a row, successful
		let lesson = await models.lesson.find({
			where: {
				id: request.body.lesson
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
				user: lesson.mentee
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

interface ReviewLessonRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		/** ID of lesson */
		lesson: string,
		/** Number between 1 and 5 (inclusive) */
		rating: number,
		comment?: string
	}
}

// Used for both initial reviews and editing reviews.
export const review = async (request: ReviewLessonRequest, response: Response) => {
	let { user, lesson: lessonId, rating, comment } = request.body;
	
	let lesson = await models.lesson.find({
		where: {
			id: lessonId,
			mentee: user.id
		}
	});
	
	// Null check
	if (!lesson) {
		response.status(httpStatus.BAD_REQUEST).end();
		return;
	}
	
	await lesson.update({
		rating,
		comment
	});
	await lesson.save();
	response.status(httpStatus.OK).end();
};