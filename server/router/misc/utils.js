import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import httpStatus from 'http-status-codes';

import models from '../../database/index';
import { exposedAttributes as userAttributes } from '../../database/models/user';
import { ProhibitedEditError } from '../../database/errors';
import { createSessionToken, verifySessionToken } from './auth';

export const logger = (request, response, next) => {
	console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
	next();
};

export const sendIndex = (request, response, next) => {
	response.sendFile(path.resolve(__dirname, '../../../public/index.html'));
};

const errorLogPath = path.resolve(__dirname, '../../errors.log');
// Clear up error log on start
fs.writeFileSync(errorLogPath, '');

export const errorHandler = (error, request, response, next) => {
	if (error instanceof ProhibitedEditError) {
		console.warn([
			`[${new Date().toUTCString()}]`,
			`Request at ${request.originalUrl} attempted make a forbidden edit. The request processing has been aborted.`,
			`Error message: ${error.message}`,
			'Details available in error log.'
		].join('\n'));
		fs.appendFileSync(errorLogPath, [
			`[${new Date().toUTCString()}] Blocked edit request:`,
			JSON.stringify(request.body, null, '\t'),
			''
		].join('\n'));
		response.status(httpStatus.FORBIDDEN).end()
	}
	else if (error === 'Request blocked by CORS.') {
		response.status(httpStatus.BAD_REQUEST).end()
	}
	else {
		console.error('Unexpected error when handling request at', request.originalUrl);
		fs.appendFileSync(errorLogPath, [
			`[${new Date().toUTCString()}] Server handling error!`,
			`Error message:`,
			`${error}`,
			`Request details:`,
			JSON.stringify(request.body, null, '\t'),
			''
		].join('\n'));
		response.status(httpStatus.INTERNAL_SERVER_ERROR).end();
	}
};

export const endResponse = (request, response) => {
	response.end();
};

/**
 * Note: account.verified indicates whether the account's email has been verified.
 *
 * @param id
 * @param [user]
 * @param [account]
 * @return {Promise.<{
 *     account: {email: String, verified: Boolean},
 *     user: {firstName, lastName, birthday},
 *     sessionJWT: String
 * }>}
 */
export const buildInitialStore = async (id, user, account) => {
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
	
	let store = {};
	
	store.account = _.pick(account, ['email', 'verified']);
	store.user = _.pick(user, userAttributes);
	store.sessionJWT = createSessionToken(id);
	
	return store;
};

export const wrapTryCatch = handler => async (request, response, next) => {
	try {
		await handler(request, response, next)
	}
	catch (error) {
		next(error)
	}
};

