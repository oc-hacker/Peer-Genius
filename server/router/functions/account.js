import httpStatus from 'http-status-codes';
import argon2 from 'argon2';

import models from '../../database/index';

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
