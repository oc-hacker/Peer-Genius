import _ from 'lodash';
import httpStatus from 'http-status-codes';

import models from '../../database/models/index';
import { exposedAttributes as userAttributes } from '../../database/models/user';

// One function for all user editing
/**
 * @param {{ body: {
 *     firstName: String,
 *     lastName: String,
 *     birthday: {year, month, day},
 * }}} request
 * @param response
 * @return {Promise.<void>}
 */
export const edit = async (request, response) => {
	let user = await models.user.find({
		where: {
			id: request.body.user.id
		}
	});
	
	if (user) {
		await user.update(request.body);
		user.save({fields: userAttributes});
		response.status(httpStatus.OK).end()
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end()
	}
};
