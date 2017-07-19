import { omit } from 'lodash';
import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models/index';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';

interface UpdateCommunicationRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		whatsapp: boolean,
		hangout: boolean,
		messenger: boolean,
		imessage: boolean
	}
}

/**
 * @param request
 * @param {Object.<string, boolean>} request.body.methods An object of boolean values describing which methods are preferred
 * @param response
 * @return {Promise.<void>}
 */
export const update = async (request: UpdateCommunicationRequest, response: Response) => {
	let communication = await models.communication.find({
		where: {
			user: request.body.user.id
		}
	});
	
	await communication.update(omit(request.body, 'user'));
	await communication.save();
	
	response.status(httpStatus.OK).end();
};
