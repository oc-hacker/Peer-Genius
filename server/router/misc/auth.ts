import * as httpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

const { JWT_SECRET, JWT_EXPIRE } = process.env;

const secret = new Buffer(JWT_SECRET, 'base64');

export const createSessionToken = (id: string): string => {
	return jwt.sign({ id } as object, secret, { expiresIn: parseInt(JWT_EXPIRE) });
};

export const verifySessionToken = (request: Request, response: Response, next: NextFunction) => {
	try {
		request.body.user = jwt.verify(request.cookies.sessionJWT, secret);
		next();
	} catch (err) {
		response.status(httpStatus.UNAUTHORIZED).json({ reason: 'Invalid session' });
	}
};
