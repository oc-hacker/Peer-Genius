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
		},
		communication: {
			skype?: string,
			hangouts?: string,
			messenger?: string,
			imessage?: string,
			whatsapp?: string,
			viber?: string,
			tango?: string,
			aim?: string,
			oovoo?: string
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
		await models.communication.create({
			user: user.id,
			...request.body.communication
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
 * UNAUTHORIZED - bad email or password
 */
export const verifyLogin = async (request: LoginRequest, response: Response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	console.log(request.body);
	console.log(account);
	
	if (account && await argon2.verify(account.password, request.body.password)) {
		response.status(httpStatus.OK).json(await buildInitialStore(account.user, null, account));
	}
	else {
		response.status(httpStatus.UNAUTHORIZED).end();
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
	
	response.status(httpStatus.OK).json({ taken: !!account })
};

export const _db = async (request: Request, response: Response) => {
	// Log the request for now, not sure what exactly this does just yet.
	console.log(request);
	
	response.status(httpStatus.OK);
};