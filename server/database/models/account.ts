import * as Sequelize from "sequelize";
import { hash } from "argon2";

import config from "../../core/config";
import { sequelizeAdmin as admin } from "../reference";
import user from "./user";
import { ProhibitedEditError } from "../errors";

export interface AccountAttributes {
	user: string,
	email: string,
	password: string,
	verified: boolean
}

export interface AccountInstance extends Sequelize.Instance<AccountAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	user: string,
	email: string,
	password: string,
	verified: string
}

const attributes = {
	user: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		set(value) {
			this.setDataValue('email', value);
			this.setDataValue('verified', false);
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	verified: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
};

const blockUserEdit = (instance: AccountInstance) => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.')
	}
};

const hashPassword = (instance: AccountInstance) => {
	if (instance.changed('password')) {
		return hash(instance.password).then(hash => instance.password = hash);
	}
};

const model: Sequelize.Model<AccountInstance,AccountAttributes> = admin.define<AccountInstance, AccountAttributes>('accounts', attributes);
model.beforeCreate(hashPassword);
model.beforeUpdate('blockUserEdit', blockUserEdit);
model.beforeUpdate('hashPassword', hashPassword);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model