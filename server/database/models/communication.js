import _ from 'lodash';
import Sequelize, { DataTypes } from 'sequelize';
import Model from 'sequelize/lib/model';

import config from '../../core/config';
import {
	sequelizeAdmin as admin
} from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

// export const methods = ['whatsapp', 'hangout', 'messenger','imessage'];

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
	whatsapp: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	hangout: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	messenger: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	imessage: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	// method: {
	// 	type: DataTypes.ENUM(methods),
	// 	allowNull: false
	// }
};

const blockUserEdit = instance => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.')
	}
};

/** @typedef {Model} */
const model = admin.define('communications', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model