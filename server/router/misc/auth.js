import express from 'express';
import httpStatus from 'http-status-codes';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import config from '../../core/config.js';

export const createHash = async (password) => {
	return await argon2.hash(password, await argon2.generateSalt());
};

export const verifyHash = async (hash, input) => {
	return await argon2.verify(hash, input);
};

const secret = new Buffer(config.sessionJWTKey, 'base64');

export const createSessionToken = function (uuid) {
	return jwt.sign({uuid: uuid}, secret, {expiresIn: config.sessionJWTExpire});
};

export const verifySessionToken = function (request, response, next) {
	try {
		request.body.user = jwt.verify(request.cookies.sessionJWT, secret);
		
		next();
	} catch (err) {
		console.log(err.message);
		response.status(httpStatus.BAD_REQUEST);
		next('Invalid session');
	}
};
