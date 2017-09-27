import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';

import { Request } from 'express';
import { AsyncHandler, VerifiedRequest } from '../../types';

import { socketRegistry } from '../../socket/connection';

class SessionRequest {
	public newbieID;
	public course;
	public assignment;
	public time;
	public duration;
	
	constructor(newbieID: string, course: string, assignment: string, time: string, duration: number) {
		this.newbieID = newbieID;
		this.course = course;
		this.assignment = assignment;
		this.time = new Date(time);
		this.duration = duration;
	}
}

class RequestInterface {
	public openRequests = [];
	
	/**
	 * Adds a new SessionRequest to the current open request list.
	 * @param request
	 */
	public add(request: SessionRequest): void {
		this.openRequests.push(request);
	}
	
	/**
	 * Returns the list of currently open requests.
	 * @return list of currently open SessionRequests
	 */
	public getRequests(): object[] {
		return this.openRequests;
	}
	
	/**
	 * Accepts a request and removes it from the list of open requests.
	 * @param {UUID} requestID UUID of the request to remove
	 * @return {Boolean} if the given requestID was found and the operation succeeded
	 */
	public acceptRequest(requestID: string): SessionRequest {
		for (let i = 0; i < this.openRequests.length; i++) {
			if (this.openRequests[i].newbieID === requestID) {
				return this.openRequests.splice(i, 1)[0];
			}
		}
		return null;
	}
}

export let requestInterface = new RequestInterface();

interface GetCurrentRequestsRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		}
	};
}

/**
 * Gets currently unanswered requests for new mentoring sessions. Called by gurus.
 * @param {UUID} request.body.user.id
 */
export const getCurrentRequests: AsyncHandler<GetCurrentRequestsRequest> = async (request, response) => {
	response.status(httpStatus.OK).json(requestInterface.getRequests());
};

interface ScheduleSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		},
		course: string,
		assignment: string,
		time: string, //ISO9001
		duration: number //in minutes
	};
}

/**
 * Schedules a new mentoring session. Called by newbies who wish to call for a new session.
 * @interface ScheduleSessionRequest
 * @param {UUID} request.body.user.id the user's UUID
 * @param {String} request.body.course the course help is needed with
 * @param {String} request.body.assignment the name of the assignment help is needed on
 * @param {String} request.body.time ISO9001 format start time and date of the session
 * @param {Number} request.body.duration the duration of the session, in minutes
 */
export const scheduleSession: AsyncHandler<ScheduleSessionRequest> = async (request, response) => {
	let { user, course, assignment, time, duration } = request.body;
	
	let newRequest = new SessionRequest(
		user.id,
		course,
		assignment,
		time,
		duration
	);
	
	requestInterface.add(newRequest);
	socketRegistry[user.id][0].to('gurusOnline').emit('newSession', newRequest);
	response.status(httpStatus.OK).end();
};

interface GetPastSessionsRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		}
	};
}

/**
 * Gets a user's past sessions.
 * @param {UUID} request.body.user.id the user's UUID
 */
export const getPastSessions: AsyncHandler<GetPastSessionsRequest> = async (request, response) => {
	let pastSessions = await models.session.findAll({
		where: {
			newbieId: request.body.user.id,
			scheduledStart: {
				$lt: new Date()
			}
		},
		raw: true
	});
	let pastSessions2 = await models.session.findAll({
		where: {
			newbieId: request.body.user.id,
			scheduledStart: {
				$lt: new Date()
			}
		},
		raw: true
	});
	if (pastSessions || pastSessions2) {
		response.status(httpStatus.OK).json(pastSessions.concat(pastSessions2));
	} else {
		response.status(httpStatus.NOT_FOUND);
	}
};

interface AcceptSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		},
		sessionID: string
	};
}

/**
 * Accepts a request for a mentoring session using the worker queue, which prevents a race condition.
 * Called by gurus.
 * @param {UUID} request.body.user.id the user's UUID
 * @param {UUID} request.body.sessionID the sessionID to accept
 */
export const acceptSession: AsyncHandler<AcceptSessionRequest> = async (request, response) => {
	let result = requestInterface.acceptRequest(request.body.sessionID);
	
	if (result) {
		//save the scheduled session
		let newSession = {
			newbie: result.newbieID,
			guru: request.body.user.id,
			scheduledStart: result.time,
			scheduledEnd: (new Date(result.time.getTime() + (result.duration * 60 * 1000))),
			course: result.course,
			assignment: result.assignment
		};
		await models.session.upsert(newSession);
		response.status(httpStatus.OK);
	} else {
		response.status(httpStatus.NOT_FOUND);
	}
};

interface GetScheduledSessionsRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		}
	};
}

/**
 * Gets all sessions scheduled for the future for the given user.
 * @param {UUID} request.body.user.id the users UUID
 */
export const getScheduledSessions: AsyncHandler<GetScheduledSessionsRequest> = async (request, response) => {
	let scheduledSessions = await models.session.findAll({
		where: {
			scheduledStart: {
				$gt: new Date()
			},
			guruId: request.body.user.id
		},
		raw: true
	});
	let scheduledSessions2 = await models.session.findAll({
		where: {
			scheduledStart: {
				$gt: new Date()
			},
			newbieId: request.body.user.id
		},
		raw: true
	});
	
	if (scheduledSessions || scheduledSessions2) {
		response.status(httpStatus.OK).json(scheduledSessions.concat(scheduledSessions2));
	} else {
		response.status(httpStatus.INTERNAL_SERVER_ERROR);
	}
};
