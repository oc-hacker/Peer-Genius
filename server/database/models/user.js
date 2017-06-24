import Sequelize, { DataTypes } from 'sequelize';
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
	}
	// TODO more fields
};

/** @typedef {Model} */
const model = admin.define('users', attributes);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model