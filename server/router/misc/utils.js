import path from 'path';
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
	// If id is set, it is an existing user. Otherwise it is a new user.
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
	
	// TODO finish building store
};

