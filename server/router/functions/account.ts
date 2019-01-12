import * as httpStatus from 'http-status-codes';
import * as argon2 from 'argon2';

import * as models from '../../database/models/index';
import { createSessionToken } from '../misc/auth';
import { buildStore } from '../misc/utils';
import { AsyncHandler, VerifiedRequest } from '../../types';
import { fetch } from 'isomorphic-fetch';

const { JWT_EXPIRE } = process.env;

interface EditAccountRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		},
		password: string;
		newEmail?: string;
		newPassword?: string;
	};
}

export const edit: AsyncHandler<EditAccountRequest> = async (request, response) => {
	let { user, password, newEmail, newPassword } = request.body;
	
	let account = await models.account.find({
		where: {
			userId: user.id
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
	const jwt = createSessionToken(request.body.user.id);
	response.cookie('sessionJWT', jwt, { maxAge: (parseInt(JWT_EXPIRE) * 1000) });
	response.status(httpStatus.OK).json({
		session: {
			jwt,
			expire: parseInt(JWT_EXPIRE) * 1000
		}
	});
};

export const exportHours: AsyncHandler<VerifiedRequest> = async (request, response) => {
	let account = await models.account.find({
		where: {
			userId: request.body.user.id
		}
	});
	let resp = await fetch('https://voluntu.io/api/login', {
		method: 'POST',
		headers: {
			Origin: 'https://voluntu.io'
		},
		body: {
			email: account.voluntuEmail,
			password: account.voluntuPassword
		}
	});
	let json = await resp.json() as any;
	await fetch('https://voluntu.io/api/hour/record', {
		method: 'POST',
		headers: {
			Origin: 'https://voluntu.io',
			Cookie: 'sessionJWT=' + json.sessionJWT
		}
	});
};

interface EditProfilePictureRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		},
		picture: string;
	}
}

/**
 * Edits a user account's profile picture. Picture is stored and transmitted as a base64 encoded.
 * @param request 
 * @param response 
 */
export const editProfilePicture: AsyncHandler<EditProfilePictureRequest> = async (request, response) => {
	const account = await models.account.find({
		where: {
			userId: request.body.user.id
		}
	});
	account.profilePicture = request.body.picture;
	await account.save();
	if (account) {
		response.status(httpStatus.OK).end();
	} else {
		response.status(httpStatus.UNAUTHORIZED).end();
	}
}