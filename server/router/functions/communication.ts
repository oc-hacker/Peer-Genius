import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { communicationMethods } from '../../database/models/communication';

import { Request } from 'express';
import { AsyncHandler, VerifiedRequest } from '../../types';

export const getMethods: AsyncHandler<Request> = async (request, response) => {
	response.status(httpStatus.OK).json({
		methods: communicationMethods
	});
};

interface EditCommunicationRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		}
		whatsapp: string | null;
		hangouts: string | null;
		messenger: string | null;
		imessage: string | null;
		skype: string | null;
		viber: string | null;
		tango: string | null;
		aim: string | null;
		oovoo: string | null;
	}
}

export const edit: AsyncHandler<EditCommunicationRequest> = async (request, response) => {
	let { user, ...newCommunications } = request.body;
	
	let communication = await models.communication.find({
		where: {
			user: user.id
		}
	});
	
	await communication.update(newCommunications);
	await communication.save();
	
	response.status(httpStatus.OK).end();
};
