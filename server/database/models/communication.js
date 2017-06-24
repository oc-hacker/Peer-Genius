import Sequelize, { DataTypes } from 'sequelize';
import Model from 'sequelize/lib/model';

import config from '../../core/config';
import {
	sequelizeAdmin as admin
} from '../reference';
import user from './user';

const attributes = {
	user: {
		type: DataTypes.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		primaryKey: true
	},
	method: {
		type: DataTypes.ENUM(['whatsapp', 'hangout', 'messenger','imessage']),
		allowNull: false
	}
};

/** @typedef {Model} */
const model = admin.define('communications', attributes);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model