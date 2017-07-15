import _ from 'lodash';
import httpStatus from 'http-status-codes';
import argon2 from 'argon2';
import randomstring from 'randomstring';

import { buildInitialStore } from '../misc/utils';
import models from '../../database/models/index';
import { exposedAttributes as userAttributes } from '../../database/models/user';

// Note: only use next() if you are not handling the request!

/**
 * @param {{body: {
 *     email: String,
 *     password: String,
 *     firstName: String,
 *     lastName: String,
 *     birthday: {year, month, day}
 * }}} request
 * @param response
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
		let user = await models.user.create(_.pick(request.body, userAttributes));
		let account = await models.account.create({
			user: user.id,
			email: request.body.email,
			password: request.body.password
		});
		
		let store = await buildInitialStore(user.id, user, account);
		
		response.status(httpStatus.OK).json(store);
		let key = await models.key.uniqueRandom('verifyEmailKey')
		// TODO send email
	}
};

/**
 * This method will send UNAUTHORIZED if email and password do not match, and BAD_REQUEST if email is not in the database.
 *
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

/**
 * @param {{body: {email: String}}} request
 * @param response
 */
export const checkEmail = async (request, response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	response.status(httpStatus.OK).json({taken: !!account})
};
