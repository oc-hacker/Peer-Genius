import { Request} from 'express';
import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { AsyncHandler, VerifiedRequest } from '../../types';

/**
 * Lists all the courses stored in database.
 */
export const list: AsyncHandler<Request> = async (request, response) => {
	console.log("Fetching courses");
	let courses = await models.course.findAll();
	console.log("COURSES: " + courses);
	response.status(httpStatus.OK).json({
		courses
	});
};
