import * as path from "path";
import * as fs from "fs";
import { pick } from "lodash";
import * as httpStatus from "http-status-codes";

import * as models from "../../database/models/index";
import { exposedAttributes as userAttributes, UserInstance } from "../../database/models/user";
import { ProhibitedEditError } from "../../database/errors";
import { createSessionToken } from "./auth";
import { AccountInstance } from "../../database/models/account";

import { Handler, Request, Response } from "@types/express";
import { Store } from "../../types";

export const logger = (request, response, next) => {
	console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
	next();
};

export const sendIndex = (request: Request, response: Response) => {
	response.sendFile(path.resolve(__dirname, '../../../public/index.html'));
};

const errorLogPath = path.resolve(__dirname, '../../errors.log');
// Clear up error log on start
fs.writeFileSync(errorLogPath, '');

export const errorHandler = (error: Error | string, request: Request, response: Response, next: Function) => {
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
		console.warn(`Request at ${request.originalUrl} blocked by CORS.`);
		response.status(httpStatus.BAD_REQUEST).end()
	}
	else {
		const timeStamp: string = new Date().toUTCString();
		console.error(`${timeStamp}Unexpected error when handling request at`, request.originalUrl, '\nDetails will be logged to error log.');
		fs.appendFileSync(errorLogPath, [
			`[${timeStamp}] Server handling error!`,
			`Error message:`,
			`${error}`,
			`Request details:`,
			JSON.stringify(request.body, null, '\t'),
			''
		].join('\n'));
		response.status(httpStatus.INTERNAL_SERVER_ERROR).end();
	}
};

export const endResponse = (request: Request, response: Response) => {
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
export const buildInitialStore = async (id: string, user?: UserInstance, account?: AccountInstance): Promise<Store> => {
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
	store.sessionJWT = createSessionToken(id);
	
	return <Store>store;
};

/**
 * Wraps the handler in a higher order function to catch any error that the handler throws and pass it to express's error handler.
 */
export const wrapTryCatch = (handler: Handler): Handler => async (request, response, next) => {
	try {
		await handler(request, response, next)
	}
	catch (error) {
		next(error)
	}
};

