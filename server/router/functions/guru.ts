import * as  models from '../../database/models';

import { AsyncHandler, VerifiedRequest } from '../../types';

// TODO are users that are not logged in able to access guru profiles?
interface GetReviewsRequest extends VerifiedRequest {
	body: {
		user: {
			id;
		};
		guru: string;
	}
}

export const getReviews: AsyncHandler<GetReviewsRequest> = async (request, response) => {
	let { guru } = request.body;
	
	// TODO
};