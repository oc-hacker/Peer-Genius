import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { communicationMethods } from '../../database/models/communication';

import { Request } from 'express';
import { AsyncHandler, VerifiedRequest } from '../../types';

interface GetCurrentRequestsRequest extends VerifiedRequest {
    body: {
        user: {
            id;
        }
    }
}

/**
 * Gets currently unanswered requests for new mentoring sessions. Called by gurus.
 * @param {UUID} request.body.user.id
 */
export const getCurrentRequests: AsyncHandler<GetCurrentRequestsRequest> = async (request, response) => {

}

interface ScheduleSessionRequest extends VerifiedRequest {
    body: {
        user: {
            id;
        },
        course: string,
        assignment: string,
        time: string, //ISO9001
        duration: number //in minutes
    }
}

/**
 * Schedules a new mentoring session. Called by newbies who wish to call for a new session.
 * @interface ScheduleSessionRequest
 * @param {UUID} request.body.user.id the user's UUID
 * @param {String} course the course help is needed with
 * @param {String} assignment the name of the assignment help is needed on
 * @param {String} time ISO9001 format start time and date of the session
 * @param {Number} duration the duration of the session, in minutes
 */
export const scheduleSession: AsyncHandler<ScheduleSessionRequest> = async(request, response) => {

}

interface GetPastSessionsRequest extends VerifiedRequest {
    body: {
        user: {
            id;
        }
    }
}

/**
 * Gets a user's past sessions.
 * @param {UUID} request.body.user.id the user's UUID
 */
export const getPastSessions: AsyncHandler<GetPastSessionsRequest> = async (request, response) => {

}

interface AcceptSessionRequest extends VerifiedRequest {
    body: {
        user: {
            id;
        },
        sessionID: string
    }
}

/**
 * Accepts a request for a mentoring session using the worker queue, which prevents a race condition.
 * Called by gurus.
 * @param {UUID} request.body.user.id the user's UUID
 * @param {UUID} sessionID the sessionID to accept
 */
export const acceptSession: AsyncHandler<AcceptSessionRequest> = async (request, response) => {

}

interface GetScheduledSessionsRequest extends VerifiedRequest {
    body: {
        user: {
            id;
        }
    }
}

/**
 * Gets all sessions scheduled for the future for the given user.
 * @param {UUID} request.body.user.id the users UUID
 */
export const getScheduledSesssions: AsyncHandler<GetScheduledSessionsRequest> = async (request, response) => {

}