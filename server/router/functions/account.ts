import * as httpStatus from 'http-status-codes';
import * as argon2 from 'argon2';

import * as models from '../../database/models/index';
import { createSessionToken } from '../misc/auth';
import { buildStore } from '../misc/utils';
import { AsyncHandler, VerifiedRequest } from '../../types';
import config from '../../core/config';

interface EditAccountRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		},
		password: string;
		newEmail?: string;
		newPassword?: string;
	}
}

export const edit: AsyncHandler<EditAccountRequest> = async (request, response) => {
	let { user, password, newEmail, newPassword } = request.body;
	
	let account = await models.account.find({
		where: {
			user: user.id
		}
	});
	
	if (!account || !password) {
		response.status(httpStatus.BAD_REQUEST).end();
		return;
	}
	
	if (await argon2.verify(account.password, password)) {
		// TODO if this breaks partial edits, need to change.
		await account.update({
			email: newEmail,
			password: newPassword
		});
		await account.save({ fields: ['email', 'password', 'verified'] });
		response.status(httpStatus.OK).end();
	}
	else {
		response.status(httpStatus.UNAUTHORIZED).end();
	}
};

export const verify: AsyncHandler<VerifiedRequest> = async (request, response) => {
	response.status(httpStatus.OK).end();
};

export const info: AsyncHandler<VerifiedRequest> = async (request, response) => {
	response.status(httpStatus.OK).json(await buildStore(request.body.user.id));
};

export const refresh: AsyncHandler<VerifiedRequest> = async (request, response) => {
	response.status(httpStatus.OK).json({
		session: {
			jwt: createSessionToken(request.body.user.id),
			expire: config.sessionJWTExpire
		}
	});
};
