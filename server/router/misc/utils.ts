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
import { AsyncHandler, Store, VerifiedRequest } from '../../types';

const { JWT_EXPIRE } = process.env;

export const logger: Handler = (request, response, next) => {
	console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
	next();
};

export const sendIndex: Handler = (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../../public/index.html'));
};

export const checkReview = async (request: VerifiedRequest, response: Response, next: NextFunction) => {
	let unfinishedReview = await models.session.find({
		where: {
			newbie: request.body.user.id,
			rating: null
		}
	});
	
	if (unfinishedReview) {
		response.status(httpStatus.FORBIDDEN).json({
			reason: 'Review required.',
			session: unfinishedReview.id
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

export const logError = (message: string): Promise<any> => {
	return new Promise(resolve => {
		fs.appendFile(errorLogPath, [message, ''].join('\n'), resolve);
	});
};

// noinspection JSUnusedLocalSymbols
export const errorHandler: ErrorRequestHandler = async (error: Error | string, request, response, next) => {
	if (error instanceof ProhibitedEditError) {
		console.warn([
			`[${new Date().toUTCString()}]`,
			`Request at ${request.originalUrl} attempted make a forbidden edit. The request processing has been aborted.`,
			'Details available in error log.'
		].join('\n'));
		await logError([
			`[${new Date().toUTCString()}] Blocked edit request:`,
			`Error message: ${error.message}`,
			JSON.stringify(request.body, null, '\t')
		].join('\n'));
		response.status(httpStatus.FORBIDDEN).end();
		
	}
	else if (error === 'Request blocked by CORS.') {
		console.warn(`Request at ${request.originalUrl} blocked by CORS.`);
		response.status(httpStatus.BAD_REQUEST).end();
	}
	else {
		const timeStamp: string = new Date().toUTCString();
		console.error(`[${timeStamp}] Unexpected error when handling request at ${request.originalUrl}\nDetails will be logged to error log.`);
		await logError([
			`[${timeStamp}] Server handling error!`,
			`Error message:`,
			`${error}`,
			`Request details:`,
			JSON.stringify(request.body, null, '\t')
		].join('\n'));
		response.status(httpStatus.INTERNAL_SERVER_ERROR).end();
	}
};

export const endResponse: Handler = (request, response) => {
	response.end();
};

interface LoadedModels {
	user?: UserInstance;
	account?: AccountInstance;
}

/**
 * Note: account.verified indicates whether the account's email has been verified.
 *
 * @param id
 * @param [loadedInstances] Instances that have already been loaded to skip searching the database for the instance.
 * @return {Promise.<Store>}
 */
export const buildStore = async (id: string, loadedInstances: LoadedModels = {}): Promise<Store> => {
	let { user, account } = loadedInstances;
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
	
	let store: any = {};
	
	store.account = pick(account, ['email', 'verified']);
	store.user = pick(user, userAttributes);
	store.session = {
		jwt: createSessionToken(id),
		expire: parseInt(JWT_EXPIRE) * 1000
	};
	
	return store as Store;
};

/**
 * Wraps the handler in a higher order function to catch any error that the handler throws and pass it to express's error handler.
 */
export const wrapTryCatch = (handler: AsyncHandler<Request>): AsyncHandler<Request> => async (request, response, next) => {
	try {
		await handler(request, response, next);
	}
	catch (error) {
		next(error);
	}
};
