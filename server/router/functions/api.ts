import { pick } from 'lodash';
import * as httpStatus from 'http-status-codes';
import * as argon2 from 'argon2';

import { buildInitialStore } from '../misc/utils';
import * as models from '../../database/models';
import { uniqueRandom as uniqueRandomKey } from '../../database/models/key';
import { exposedAttributes as userAttributes } from '../../database/models/user';

import { Request, Response } from 'express';
import { Store } from '../../types';

// Note: only use next() if you are not handling the request!

interface CreateAccountRequest extends Request {
	body: {
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		birthday: {
			year: number,
			month: number,
			day: number
		}
	}
}

/**
 * Response:
 * OK - account creation successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * CONFLICT - email already used
 */
export const createAccount = async (request: CreateAccountRequest, response: Response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	if (account) {
		// Email already exists.
		response.status(httpStatus.CONFLICT).end();
	} else {
		// OK
		let user = await models.user.create(pick(request.body, userAttributes));
		let account = await models.account.create({
			user: user.id,
			email: request.body.email,
			password: request.body.password
		});
		
		let store: Store = await buildInitialStore(user.id, user, account);
		
		response.status(httpStatus.OK).json(store);
		let key = await uniqueRandomKey('verifyEmailKey')
		// TODO send email
	}
};

interface LoginRequest extends Request {
	body: {
		email: string,
		password: string
	}
}

/**
 * Response:
 * OK - login successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * UNAUTHORIZED - bad password
 * BAD_REQUEST - email is not found in database
 */
export const verifyLogin = async (request: LoginRequest, response: Response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	if (account) {
		if (await argon2.verify(account.password, request.body.password)) {
			response.status(httpStatus.OK).json(await buildInitialStore(account.user, null, account));
		}
		else {
			response.status(httpStatus.UNAUTHORIZED).end();
		}
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end();
	}
};

interface CheckEmailRequest extends Request {
	body: {
		email: string
	}
}

/**
 * Checks whether an email is in use.
 * Response:
 * OK - the request will always be OK. Field <code>taken</code> in response body will indicate whether the email has been taken.
 */
export const checkEmail = async (request: CheckEmailRequest, response: Response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	response.status(httpStatus.OK).json({taken: !!account})
};
