import path from 'path';
import _ from 'lodash/core';

import models from '../../database/index';
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

export const buildInitialStore = async id => {
	let user;
	if (id) {
		user = await models.user.find({
			where: {
				id
			}
		});
	}
	else {
		user = await models.user.create();
	}
	
	let store = {};
	
	store.user = _.pick(user, Object.keys(user.attributes));
	
	// TODO finish building store
	return {
		user,
		store
	};
};

