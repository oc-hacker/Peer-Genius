import Sequelize, {DataTypes} from 'sequelize';
import Model from 'sequelize/lib/model';

import config from '../../core/config';
import {
	sequelizeAdmin as admin
} from '../reference';

const attributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.CHAR(95),
		allowNull: false
	}
};

/** @typedef {Model} */
const model = admin.define('accounts', attributes);
model.sync({alter: config.betaMode}); // Alter when in beta mode

export default model