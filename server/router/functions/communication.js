import httpStatus from 'http-status-codes';

import models from '../../database/index';

/**
 * @param request
 * @param {Object.<string, boolean>} request.body.methods An object of boolean values describing which methods are preferred
 * @param response
 * @return {Promise.<void>}
 */
export const update = async (request, response) => {
	// for (let method of communicationMethods) {
	// 	if (request.body.methods[method]) {
	// 		models.communication.findOrCreate({
	// 			where: {
	// 				user: request.body.user.id
	// 			},
	// 			defaults: {
	// 				method
	// 			}
	// 		});
	// 	}
	// 	else {
	// 		models.communication.find({
	// 			where: {
	// 				user: request.body.user.id,
	// 				method
	// 			}
	// 		}).then(row => {
	// 			if (row) {
	// 				row.destroy();
	// 			}
	// 		})
	// 	}
	// }
	let communication = await models.communication.find({
		where: {
			user: request.body.user.id
		}
	});
	
	await communication.update(_.omit(request.body, 'user'));
	await communication.save();
	
	response.status(httpStatus.OK).end();
};
