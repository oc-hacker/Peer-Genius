import * as httpStatus from 'http-status-codes';
import * as sequelize from 'sequelize';

import * as models from '../../database/models';

import { Response } from 'express';
import { AsyncHandler, VerifiedRequest } from '../../types';

interface SessionInfoRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		};
		session: string;
	};
}

export const info: AsyncHandler<SessionInfoRequest> = async (request, response) => {
	let result = await models.session.find({
		where: {
			id: request.body.session
		}
	});
	
	response.status(httpStatus.OK).json({
		session: result
	});
};

export const recent: AsyncHandler<VerifiedRequest> = async (request, response) => {
	let { user: { id: userID } } = request.body;
	
	let recentSessions = await models.session.all({
		where: {
			$or: [{
				newbieId: userID
			}, {
				guruId: userID
			}]
		} as any,
		include: [{
			model: models.user,
			attributes: [
				[sequelize.fn('CONCAT', sequelize.col('guru.firstName'), ' ', sequelize.col('guru.lastName')), 'guruName'],
			],
			as: 'guru',
		}, {
			model: models.user,
			attributes: [
				[sequelize.fn('CONCAT', sequelize.col('newbie.firstName'), ' ', sequelize.col('newbie.lastName')), 'newbieName']
			],
			as: 'newbie'
		}],
		attributes: [],
		limit: 10, // TODO pagination?
	});
	
	response.status(httpStatus.OK).json({
		recentSessions
	});
};
