import Sequelize from 'sequelize';
import Model from 'sequelize/lib/model';

import config from '../../config';
import {
	sequelizeAdmin as admin
} from '../reference';

export const attributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	}
};

const model = admin.define('accounts', attributes);
model.sync({alter: config.betaMode}); // Alter when in beta mode

export default {
	model,
	attributes
}