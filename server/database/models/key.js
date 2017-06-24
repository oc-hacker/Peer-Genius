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
	verifyEmailKey: {
		type: DataTypes.CHAR(15),
		allowNull: false,
		unique: true
	}
};

/** @typedef {Model} */
const model = admin.define('keys', attributes);
model.sync({alter: config.betaMode}); // Alter when in beta mode

export default model