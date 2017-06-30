import Sequelize, { DataTypes } from 'sequelize';
import Model from 'sequelize/lib/model';
import argon2 from 'argon2'

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
				throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.')
			}
			else {
				this.setDataValue('user', value)
			}
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		set(value) {
			this.setDataValue('email', value);
			this.setDataValue('verified', false);
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		set(value) {
			argon2.hash(value).then(hash => {
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