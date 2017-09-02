import { pick } from 'lodash';
import * as httpStatus from 'http-status-codes';

import * as  models from '../../database/models';

import { AsyncHandler, VerifiedRequest } from '../../types';

// TODO are users that are not logged in able to access guru profiles?
interface GetReviewsRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		};
		/** The id of the guru */
		guru: string;
	}
}

export const getReviews: AsyncHandler<GetReviewsRequest> = async (request, response) => {
	let sessions = await models.session.all({
		where: {
			mentor: request.body.guru,
			rating: {
				$not: null
			}
		}
	});
	
	let reviews = Promise.all(
		sessions
			.map(session => pick(session, 'mentee', 'subject', 'rating', 'comment'))
			.map(
				(session: { mentee: string, subject: string, rating: string, comment: string }) => models.user.find({
					where: {
						id: session.mentee
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