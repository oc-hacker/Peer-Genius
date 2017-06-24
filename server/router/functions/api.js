import httpStatus from 'http-status-codes';
import argon2 from 'argon2';

import { buildInitialStore } from '../misc/utils';
import models from '../../database/index';

// Note: only use next() if you are not handling the request!

/**
 * @param {{body: {email: String, password: String}}} request
 * @param response
 * @return {Promise.<void>}
 */
export const createAccount = async (request, response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	if (account) {
		// Email already exists.
		response.status(httpStatus.CONFLICT).end();
	} else {
		// OK
		response.status(httpStatus.OK).json(await buildInitialStore());
	}
};

/**
 * @param {{body: {email: String, password: String}}} request
 * @param response
 * @return {Promise.<void>}
 */
export const verifyLogin = async (request, response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	if (account) {
		if (await argon2.verify(account.password, request.body.password)) {
			response.status(httpStatus.OK).json(await buildInitialStore(account.user));
		}
		else {
			response.status(httpStatus.UNAUTHORIZED).end();
		}
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end();
	}
};
