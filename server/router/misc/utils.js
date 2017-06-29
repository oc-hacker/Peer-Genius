import path from 'path';
import _ from 'lodash/core';

import models from '../../database/index';
import { exposedAttributes as userAttributes } from '../../database/models/user';
import { createSessionToken, verifySessionToken } from './auth';

export const logger = (request, response, next) => {
	console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
	next();
};

export const sendIndex = (request, response, next) => {
	response.sendFile(path.resolve(__dirname, '../../public/index.html'));
};

export const endResponse = (request, response) => {
	response.end();
};

/**
 * Note: account.verified indicates whether the account's email has been verified.
 *
 * @param id
 * @param [user]
 * @param [account]
 * @return {Promise.<{
 *     account: {email: String, verified: Boolean},
 *     user: {firstName, lastName, birthday},
 *     sessionJWT: String
 * }>}
 */
export const buildInitialStore = async (id, user, account) => {
	user = user || await models.user.find({
			where: {
				id
			}
		});
	account = account || await models.account.find({
			where: {
				user: id
			}
		});
	
	let store = {};
	
	store.account = _.pick(account, ['email', 'verified']);
	store.user = _.pick(user, userAttributes);
	store.sessionJWT = createSessionToken(id);
	
	return store;
};

