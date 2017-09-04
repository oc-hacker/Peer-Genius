import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';

import { AsyncHandler, VerifiedRequest } from '../../types';

interface ReviewSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		}
		session: string;
		rating: number;
		comment?: string;
	};
}

export const review: AsyncHandler<ReviewSessionRequest> = async (request, response) => {
	// TODO testing
	let { user, session: sessionId, rating, comment = '' } = request.body;
	
	let session = await models.session.find({
		where: {
			id: sessionId,
			newbie: user.id
		}
	});
	
	if (session) {
		await session.set({
			rating,
			comment
		});
		await session.save();
		response.status(httpStatus.OK).end();
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end();
	}
};
