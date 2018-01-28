import { pick } from 'lodash';
import * as httpStatus from 'http-status-codes';
import { Request } from 'express';

import * as models from '../../database/models';

import { AsyncHandler, VerifiedRequest } from '../../types';

// TODO are users that are not logged in able to access guru profiles?
interface GetReviewsRequest extends Request {
	body: {
		/** The id of the guru */
		guru: string;
	};
}

export const getReviews: AsyncHandler<GetReviewsRequest> = async (request, response) => {
	let sessions = await models.session.all({
		where: {
			guruId: request.body.guru,
			rating: {
				$not: null
			}
		}
	});
	
	let reviews = Promise.all(
		sessions
			.map(session => pick(session, 'id', 'newbie', 'subject', 'rating', 'comment'))
			.map(
				(session: { id: string, newbie: string, subject: string, rating: number, comment: string }) => models.user.find({
					where: {
						id: session.newbie
					}
				}).then(user => ({
					...session,
					newbieName: `${user.firstName} ${user.lastName}`
				}))
			)
	);
	
	response.status(httpStatus.OK).json({
		reviews
	});
};

interface UpdateGuruRequest extends Request {
	body: {
		user: string;
		courseId: string;
		enabled: boolean;
	};
}

export const update: AsyncHandler<UpdateGuruRequest> = async (request, response) => {
	let { user, courseId, enabled } = request.body;
	
	await models.guru.upsert({
		userId: user,
		courseId,
		enabled
	});
	
	response.status(httpStatus.OK).end();
};
