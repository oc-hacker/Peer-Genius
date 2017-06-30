import Sequelize, { DataTypes } from 'sequelize';
import Model from 'sequelize/lib/model';
import randomstring from 'randomstring';

import config from '../../core/config';
import {
	sequelizeAdmin as admin
} from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

const attributes = {
	user: {
		type: DataTypes.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		primaryKey: true,
		set(value) {
			if (this.getDataValue('user')) {
				throw new ProhibitedEditError('Editing the user FK of keys table is prohibited.')
			}
			else {
				this.setDataValue('user', value)
			}
		}
	},
	verifyEmailKey: {
		type: DataTypes.CHAR(32),
		allowNull: true,
		unique: true
	},
};

/** @typedef {Model} */
const model = admin.define('keys', attributes);
model.sync({alter: config.devMode}); // Alter when in development mode

// Extra utility methods
/**
 * Generates a key that is guaranteed to be unique for the specified field.
 * TODO test the method
 * @param column The column of the database to generate the key for. It should be a CHAR(32) column.
 * @return {Promise.<string>}
 */
model.uniqueRandom = async column => {
	let key;
	do {
		key = randomstring.generate();
	} while ((await model.find({where: {[column]: key}})));
	return key;
};

export default model