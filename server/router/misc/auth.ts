import * as httpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

import config from '../../core/config';

import { Request, Response } from 'express';

const secret = new Buffer(config.sessionJWTKey, 'base64');

export const createSessionToken = (id: string): string => {
	return jwt.sign(<object>{id}, secret, {expiresIn: config.sessionJWTExpire});
};

export const verifySessionToken = (request: Request, response: Response, next: Function) => {
	try {
		request.body.user = jwt.verify(request.cookies.sessionJWT, secret);
		next();
	} catch (err) {
		response.status(httpStatus.UNAUTHORIZED).json({reason: 'Invalid session'});
	}
};
