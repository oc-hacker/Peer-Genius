import * as Sequelize from 'sequelize';
import { hash } from 'argon2';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface AccountAttributes {
	userId?: string;
	email?: string;
	password?: string;
	verified?: boolean;
	profilePicture: string;
}

export interface AccountInstance extends Sequelize.Instance<AccountAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	userId: string;
	email: string;
	password: string;
	verified: string;
	time: number;
	voluntuEmail: string;
	voluntuPassword: string;
	profilePicture: string;
}

const attributes: Sequelize.DefineAttributes = {
	userId: {
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
	},
	time: {
		type: Sequelize.BIGINT,
		defaultValue: 0
	},
	voluntuEmail: {
		type: Sequelize.STRING,
	},
	voluntuPassword: {
		type: Sequelize.STRING
	},
	profilePicture: {
		type: Sequelize.TEXT('medium') // ~12 MB max
	}
};

const blockUserEdit = (instance: AccountInstance) => {
	if (instance.changed('userId')) {
		throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.');
	}
};

const hashPassword = (instance: AccountInstance) => {
	if (instance.changed('password')) {
		return hash(instance.password).then(hash => instance.password = hash);
	}
};

const model: Sequelize.Model<AccountInstance, AccountAttributes> = admin.define<AccountInstance, AccountAttributes>('accounts', attributes as Sequelize.DefineModelAttributes<AccountAttributes>, {
	charset: 'utf8'
});
model.beforeCreate(hashPassword);
model.beforeUpdate('blockUserEdit', blockUserEdit);
model.beforeUpdate('hashPassword', hashPassword);

model.belongsTo(user, {
	foreignKey: 'id',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasOne(model, {
	foreignKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

/* user.hasMany(model);
model.belongsTo(user, {
	as: 'Current',
	foreignKey: 'id',
	constraints: false
}); */

export default model;
