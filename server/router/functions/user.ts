import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models/index';
import { exposedAttributes as userAttributes } from '../../database/models/user';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';

interface EditUserRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		}
		firstName: string,
		lastName: string,
		birthday: {
			year: number,
			month: number,
			day: number
		}
	}
}

// One function for all user editing
/**
 * Response:
 * OK - edit successful
 * BAD_REQUEST - user not found (should not happen)
 */
export const edit = async (request: EditUserRequest, response: Response) => {
	let user = await models.user.find({
		where: {
			id: request.body.user.id
		}
	});
	
	if (user) {
		await user.update(request.body);
		await user.save({fields: userAttributes});
		response.status(httpStatus.OK).end()
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end()
	}
};
