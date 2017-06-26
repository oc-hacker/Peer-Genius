import httpStatus from 'http-status-codes';
import argon2 from 'argon2';
import randomstring from 'randomstring';

import { buildInitialStore } from '../misc/utils';
import models from '../../database/index';

// Note: only use next() if you are not handling the request!

/**
 * @param {{body: {email: String, password: String}}} request
 * @param response
 * @return {Promise.<void>}
 */
export const createAccount = async (request, response) => {
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
		let {user, store} = await buildInitialStore();
		models.account.create({
			user: user.id,
			email: request.body.email,
			password: request.body.password
		});
		
		response.status(httpStatus.OK).json(store);
		let key = await models.key.uniqueRandom('verifyEmailKey')
		// TODO send mail
	}
};

/**
 * @param {{body: {email: String, password: String}}} request
 * @param response
 * @return {Promise.<void>}
 */
export const verifyLogin = async (request, response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	if (account) {
		if (await argon2.verify(account.password, request.body.password)) {
			response.status(httpStatus.OK).json(await buildInitialStore(account.user));
		}
		else {
			response.status(httpStatus.UNAUTHORIZED).end();
		}
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end();
	}
};
