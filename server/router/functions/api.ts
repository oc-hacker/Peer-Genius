import { pick } from 'lodash';
import * as httpStatus from 'http-status-codes';
import * as argon2 from 'argon2';

import { buildStore } from '../misc/utils';
import * as models from '../../database/models';
import { uniqueRandom as uniqueRandomKey } from '../../database/models/key';
import { exposedAttributes as userAttributes } from '../../database/models/user';

import { Request } from 'express';
import { AsyncHandler, Store } from '../../types';
import { slackConnection } from '../../database/reference';

const { SLACK_TOKEN, NODE_ENV } = process.env;

// Note: only use next() if you are not handling the request!

/**
 * Used for letting the client retrieve server configuration information.
 */
export const getConfig: AsyncHandler<Request> = async (request, response) => {
	response.status(httpStatus.OK).json({
		devMode: NODE_ENV === 'dev'
	});
};

interface CreateAccountRequest extends Request {
	body: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		birthday: {
			year: number;
			month: number;
			day: number;
		}
		communication: {
			skype?: string;
			hangouts?: string;
			messenger?: string;
			imessage?: string;
			whatsapp?: string;
			viber?: string;
			tango?: string;
			aim?: string;
			oovoo?: string;
		}
	};
}

/**
 * Response:
 * OK - account creation successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * CONFLICT - email already used
 */
export const createAccount: AsyncHandler<CreateAccountRequest> = async (request, response) => {
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
			profilePicture: null,
			userId: user.id,
			email: request.body.email,
			password: request.body.password
		});
		
		let store: Store = await buildStore(user.id, { user, account });
		
		response.status(httpStatus.OK).json(store);
		let key = await uniqueRandomKey('verifyEmailKey');
		// TODO send email
	}
};

interface LoginRequest extends Request {
	body: {
		email: string;
		password: string;
	};
}

/**
 * Response:
 * OK - login successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * UNAUTHORIZED - bad email or password
 */
export const verifyLogin: AsyncHandler<LoginRequest> = async (request, response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	if (account && await argon2.verify(account.password, request.body.password)) {
		response.status(httpStatus.OK).json(await buildStore(account.userId, { account }));
	}
	else {
		response.status(httpStatus.UNAUTHORIZED).end();
	}
};

interface CheckEmailRequest extends Request {
	body: {
		email: string;
	};
}

/**
 * Checks whether an email is in use.
 * Response:
 * OK - the request will always be OK. Field <code>taken</code> in response body will indicate whether the email has been taken.
 */
export const checkEmail: AsyncHandler<CheckEmailRequest> = async (request, response) => {
	let account = await models.account.find({
		where: {
			email: request.body.email
		}
	});
	
	response.status(httpStatus.OK).json({ taken: !!account });
};

interface SlackRequest extends Request {
	body: {
		token: string;
		command: string;
		text: string;
		response_url: string;
	};
}

export const _db: AsyncHandler<Request> = async (request, response) => {
	let { token, command, text } = request.body;
	
	if (token === SLACK_TOKEN) {
		try {
			// Parse command
			let flags: string[] = text.match(/--\S+/g).map(flag => flag.substring(2));
			let command: string = text.replace(/--\S+/g, '').replace(/\s+/g, ' ');
			
			let [mode, ...rest] = command.split(' ');
			let mainCommand: string = rest.join(' ');
			
			// Establish connection
			let connection = await slackConnection();
			
			let results;
			switch (mode.toLowerCase()) {
				case 'overview': {
					// language=MYSQL-SQL
					results = await connection.query(`SELECT COUNT(*) AS totalCount FROM users`);
					let totalCount = results[0].totalCount;
					// language=MYSQL-SQL
					results = await connection.query(`SELECT COUNT(*) AS guruCount FROM users INNER JOIN gurus ON gurus.user = users.id`);
					let guruCount = results[0].guruCount;
					
					response.status(httpStatus.OK).json({
						text: `There are ${totalCount} registered users at Peer Genius, of which ${guruCount} can be gurus.`
					});
				}
			}
			
			connection.release();
		}
		catch (error) {
			response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
		}
	}
	else {
		response.status(httpStatus.UNAUTHORIZED).end();
	}
};
