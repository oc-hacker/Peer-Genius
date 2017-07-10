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
	biology: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	geometry: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	algebra2: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	spanish: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	// TODO More subjects
};

const blockUserEdit = instance => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of mentors table is prohibited.')
	}
};

/** @typedef {Model} */
const model = admin.define('mentors', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model