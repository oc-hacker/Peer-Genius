import * as path from 'path';
import * as fs from 'fs';
import { pick } from 'lodash';
import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { exposedAttributes as userAttributes, UserInstance } from '../../database/models/user';
import { ProhibitedEditError } from '../../database/errors';
import { createSessionToken } from './auth';
import { AccountInstance } from '../../database/models/account';

import { Handler, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Store, VerifiedRequest } from '../../types';
import { CommunicationInstance, communicationMethods } from '../../database/models/communication';
import config from '../../core/config';

export const logger: Handler = (request, response, next) => {
	console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
	next();
};

export const sendIndex: Handler = (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../../public/index.html'));
};

export const checkReview = async (request: VerifiedRequest, response: Response, next: NextFunction) => {
	let unfinishedReview = await models.lesson.find({
		where: {
			mentee: request.body.user.id,
			rating: null
		}
	});
	
	if (unfinishedReview) {
		response.status(httpStatus.FORBIDDEN).json({
			reason: 'Review required.',
			lesson: unfinishedReview.id
		});
		return;
	}
	else {
		next();
	}
};

const errorLogPath = path.resolve(__dirname, '../../errors.log');
// Clear up error log on start
fs.writeFileSync(errorLogPath, '');

export const errorHandler: ErrorRequestHandler = (error: Error | string, request, response, next) => {
	if (error instanceof ProhibitedEditError) {
		console.warn([
			`[${new Date().toUTCString()}]`,
			`Request at ${request.originalUrl} attempted make a forbidden edit. The request processing has been aborted.`,
			'Details available in error log.'
		].join('\n'));
		fs.appendFile(errorLogPath, [
			`[${new Date().toUTCString()}] Blocked edit request:`,
			`Error message: ${error.message}`,
			JSON.stringify(request.body, null, '\t'),
			''
		].join('\n'), () => {
			response.status(httpStatus.FORBIDDEN).end();
		});
		
	}
	else if (error === 'Request blocked by CORS.') {
		console.warn(`Request at ${request.originalUrl} blocked by CORS.`);
		response.status(httpStatus.BAD_REQUEST).end();
	}
	else {
		const timeStamp: string = new Date().toUTCString();
		console.error(`[${timeStamp}] Unexpected error when handling request at ${request.originalUrl}\nDetails will be logged to error log.`);
		fs.appendFile(errorLogPath, [
			`[${timeStamp}] Server handling error!`,
			`Error message:`,
			`${error}`,
			`Request details:`,
			JSON.stringify(request.body, null, '\t'),
			''
		].join('\n'), () => {
			response.status(httpStatus.INTERNAL_SERVER_ERROR).end();
		});
		
	}
};

export const endResponse: Handler = (request, response) => {
	response.end();
};

interface LoadedModels {
	user?: UserInstance,
	account?: AccountInstance,
	communication?: CommunicationInstance
}

/**
 * Note: account.verified indicates whether the account's email has been verified.
 *
 * @param id
 * @param [loadedInstances] Instances that have already been loaded to skip searching the database for the instance.
 * @return {Promise.<Store>}
 */
export const buildStore = async (id: string, loadedInstances: LoadedModels = {}): Promise<Store> => {
	let { user, account, communication } = loadedInstances;
	user = user || await models.user.find({
		where: {
			id
		}
	});
	account = account || await models.account.find({
		where: {
			user: id
		}
	});
	communication = communication || await models.communication.find({
		where: {
			user: id
		}
	});
	
	let store: any = {};
	
	store.account = pick(account, ['email', 'verified']);
	store.user = pick(user, [...userAttributes, 'id']);
	store.communication = pick(communication, communicationMethods);
	store.session = {
		jwt: createSessionToken(id),
		expire: config.sessionJWTExpire
	};
	
	return <Store>store;
};

/**
 * Wraps the handler in a higher order function to catch any error that the handler throws and pass it to express's error handler.
 */
export const wrapTryCatch = (handler: (Request, Response, NextFunction) => Promise<any>): Handler => async (request: Request, response: Response, next: NextFunction) => {
	try {
		await handler(request, response, next);
	}
	catch (error) {
		next(error);
	}
};

