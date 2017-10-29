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
		sessionId: string;
	};
}

export const info: AsyncHandler<SessionInfoRequest> = async (request, response) => {
	let result = await models.session.find({
		where: {
			id: request.body.sessionId
		},
		include: [{
			model: models.user,
			as: 'guru'
		}, {
			model: models.user,
			as: 'newbie'
		}, models.course]
	});
	
	response.status(httpStatus.OK).json({
		session: result
	});
};

interface RecentSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		};
		mode?: 'guru' | 'newbie'; // The user is ... in the session (leave undefined to accept both)
		limit?: number;
		page?: number; // 0-indexed
	};
}

export const recent: AsyncHandler<RecentSessionRequest> = async (request, response) => {
	let { user: { id: userID }, mode, limit = 20, page = 0 } = request.body;
	limit = Math.min(limit, 50); // Cap limit at 50 to protect server resources
	
	let recentSessions = await models.session.all({
		where: mode
			? {
				[`${mode}Id`]: userID
			}
			: {
				$or: [{
					newbieId: userID
				}, {
					guruId: userID
				}]
			} as any,
		include: [{
			model: models.user,
			attributes: [
				[sequelize.fn('CONCAT', sequelize.col('guru.firstName'), ' ', sequelize.col('guru.lastName')), 'name'],
				'id'
			],
			as: 'guru',
		}, {
			model: models.user,
			attributes: [
				[sequelize.fn('CONCAT', sequelize.col('newbie.firstName'), ' ', sequelize.col('newbie.lastName')), 'name'],
				'id'
			],
			as: 'newbie'
		}, {
			model: models.course,
			attributes: ['name']
		}],
		attributes: ['id'],
		limit,
		offset: limit * page
	});
	
	response.status(httpStatus.OK).json({
		recentSessions
	});
};

interface ReviewSessionRequest extends VerifiedRequest {
	body: {
		user: {
			id: string;
		};
		/** UUID of session */
		session: string;
		rating: number;
		comment?: string;
	};
}

export const review: AsyncHandler<ReviewSessionRequest> = async (request, response) => {
	let { user, session: sessionId, rating, comment } = request.body;
	
	let session = await models.session.find({
		where: {
			id: sessionId,
			newbieId: user.id
		}
	});
	
	if (session) {
		await session.update({
			rating,
			comment
		});
		await session.save();
		
		response.status(httpStatus.OK).end();
	}
	else {
		response.status(httpStatus.BAD_REQUEST).end();
	}
};
