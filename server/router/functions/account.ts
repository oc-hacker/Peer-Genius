import * as httpStatus from 'http-status-codes';
import * as argon2 from 'argon2';

import * as models from '../../database/models/index';
import { createSessionToken } from '../misc/auth';
import { buildInitialStore } from '../misc/utils';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';

interface EditAccountRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		password: string,
		newEmail: string,
		newPassword: string
	}
}

export const edit = async (request: EditAccountRequest, response: Response) => {
	let account = await models.account.find({
		where: {
			user: request.body.user.id
		}
	});
	
	if (await argon2.verify(account.password, request.body.password)) {
		await account.update(request.body);
		await account.save({ fields: [ 'email', 'password', 'verified' ] });
		response.status(httpStatus.OK).end();
	}
	else {
		response.status(httpStatus.UNAUTHORIZED).end()
	}
};

export const verify = async (request: VerifiedRequest, response: Response) => {
	response.status(httpStatus.OK).end();
};

export const info = async (request: VerifiedRequest, response: Response) => {
	response.status(httpStatus.OK).json(await buildInitialStore(request.body.user.id))
};

export const refresh = async (request: VerifiedRequest, response: Response) => {
	response.status(httpStatus.OK).json({ sessionJWT: createSessionToken(request.body.user.id) })
};
