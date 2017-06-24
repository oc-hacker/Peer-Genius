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
	subject: {
		type: DataTypes.ENUM(['biology', 'geometry', 'algebra2', 'spanish']), // TODO expand
		allowNull: false
	}
};

/** @typedef {Model} */
const model = admin.define('mentors', attributes);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model