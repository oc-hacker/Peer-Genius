import httpStatus from 'http-status-codes';
import argon2 from 'argon2';

import models from '../../database/index';
import { createSessionToken } from '../misc/auth';
import { buildInitialStore } from '../misc/utils';

// One function for all account editing
/**
 * @param {{body: {
 *     password: String,
 *     newEmail: String?,
 *     newPassword: String
 * }}} request
 * @param response
 */
export const edit = async (request, response) => {
	let account = await models.account.find({
		where: {
			user: request.body.user.id
		}
	});
	
	if (!account) {
		response.status(httpStatus.BAD_REQUEST).end();
	}
	else {
		if (await argon2.verify(account.password, request.body.password)) {
			await account.update(request.body);
			account.save({fields: ['email', 'password', 'verified']})
		}
		else {
			response.status(httpStatus.UNAUTHORIZED).end()
		}
	}
};

/**
 * Just OKs the request.
 * Invalid JWT would be caught by an earlier handler. If the request reached here then it's ok.
 */
export const verify = async (request, response) => {
	response.status(httpStatus.OK).end();
};

/**
 * Sends information to the client.
 * @param request
 * @param response
 * @return {Promise.<void>}
 */
export const info = async (request, response) => {
	response.status(httpStatus.OK).json(await buildInitialStore(request.body.user.id))
};

/**
 * Refreshes the session JWT of the client.
 */
export const refresh = async (request, response) => {
	response.status(httpStatus.OK).json({sessionJWT: createSessionToken(request.body.user.id)})
};
