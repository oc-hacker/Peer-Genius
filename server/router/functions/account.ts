import * as httpStatus from 'http-status-codes';
import * as argon2 from 'argon2';

import * as models from '../../database/models/index';
import { createSessionToken } from '../misc/auth';
import { buildInitialStore } from '../misc/utils';

import { Response } from '@types/express';
import { VerifiedRequest } from "../../types";

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

// One function for all account editing
/**
 * Response:
 * OK - edit successful
 * UNAUTHORIZED - bad password
 * BAD_REQUEST - account does not exist (usually should not happen)
 *
 * @param {EditAccountRequest} request
 * @param response
 */
export const edit = async (request: EditAccountRequest, response: Response) => {
	let account = await models.account.find({
		where: {
			user: request.body.user.id
		}
	});
	
	if (!account) {
		response.status(httpStatus.BAD_REQUEST).end();
	}
	else {
		if (await argon2.verify(account.password, request.body.password)) {
			await account.update(request.body);
			account.save({fields: ['email', 'password', 'verified']})
		}
		else {
			response.status(httpStatus.UNAUTHORIZED).end()
		}
	}
};

/**
 * Just OKs the request.
 * Invalid JWT would be caught by an earlier handler. If the request reached here then it's ok.
 */
export const verify = async (request: VerifiedRequest, response: Response) => {
	response.status(httpStatus.OK).end();
};

/**
 * Sends information to the client.
 * Response format: see <code>Store</code> interface defined in <code>server/types.ts</code>
 *
 * @param request
 * @param response
 */
export const info = async (request: VerifiedRequest, response: Response) => {
	response.status(httpStatus.OK).json(await buildInitialStore(request.body.user.id))
};

/**
 * Refreshes the session JWT of the client.
 * Response format: {
 * 	sessionJWT: string // The new session JWT
 * }
 */
export const refresh = async (request: VerifiedRequest, response: Response) => {
	response.status(httpStatus.OK).json({sessionJWT: createSessionToken(request.body.user.id)})
};
