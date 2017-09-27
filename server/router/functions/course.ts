import { Request} from 'express';
import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { AsyncHandler, VerifiedRequest } from '../../types';

/**
 * Lists all the courses stored in database.
 */
export const list: AsyncHandler<Request> = async (request, response) => {
	let courses = await models.course.all();
	
	response.status(httpStatus.OK).json({
		courses
	});
};
