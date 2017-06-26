import Sequelize, {DataTypes} from 'sequelize';
import Model from 'sequelize/lib/model';
import argon2 from 'argon2'

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
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		set(val) {
			// Use setter
			argon2.hash(val).then(hash => {
				this.setDataValue('password', hash)
			})
		}
	},
	verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
};

/** @typedef {Model} */
const model = admin.define('accounts', attributes);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model