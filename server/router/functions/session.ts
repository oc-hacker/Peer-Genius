import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';

import { Response } from 'express';
import { AsyncHandler, VerifiedRequest } from '../../types';

interface SessionInfoRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		};
		session: string;
	};
}

export const info: AsyncHandler<SessionInfoRequest> = async (request, response) => {
	let result = await models.session.find({
		where: {
			id: request.body.session
		}
	});
	
	response.status(httpStatus.OK).json({
		session: result
	});
};
