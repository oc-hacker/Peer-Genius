import { methods as communicationMethods } from '../../database/models/communication';
import models from '../../database/index';

/**
 * @param request
 * @param {Object.<string, boolean>} request.body.methods An object of boolean values describign which methods are preferred
 * @param response
 * @return {Promise.<void>}
 */
export const update = async (request, response) => {
	for (let method of communicationMethods) {
		if (request.body.methods[method]) {
			models.communication.findOrCreate({
				where: {
					user: request.body.user.id
				},
				defaults: {
					method
				}
			});
		}
		else {
			models.communication.find({
				where: {
					user: request.body.user.id,
					method
				}
			}).then(row => {
				if (row) {
					row.destroy();
				}
			})
		}
	}
};
