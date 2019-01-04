import * as Sequelize from 'sequelize';
import * as randomstring from 'randomstring';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface KeyAttributes {
	userId?: string;
	verifyEmailKey?: string;
	nextEmail?: string;
}

export interface KeyInstance extends Sequelize.Instance<KeyAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	userId: string;
	verifyEmailKey: string;
	nextEmail: string;
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
		primaryKey: true,
	},
	verifyEmailKey: {
		type: Sequelize.CHAR(32),
		allowNull: true,
		unique: true
	},
	nextEmail: {
		type: Sequelize.STRING,
		allowNull: true
	}
};

const blockUserEdit = (instance: KeyInstance) => {
	if (instance.changed('userId')) {
		throw new ProhibitedEditError('Editing the user FK of keys table is prohibited.');
	}
};

const model: Sequelize.Model<KeyInstance, KeyAttributes> = admin.define<KeyInstance, KeyAttributes>('keys', attributes, {
	charset: 'utf8'
});
model.beforeUpdate(blockUserEdit);

// Extra utility methods
/**
 * Generates a key that is guaranteed to be unique for the specified field.
 * TODO test the method
 * @param column The column of the database to generate the key for. It should be a CHAR(32) column.
 * @return {Promise.<string>}
 */
export const uniqueRandom = async (column: string) => {
	let key;
	do {
		key = randomstring.generate();
	} while ((await model.find({ where: { [column]: key } })));
	return key;
};

model.belongsTo(user, {
	foreignKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasOne(model, {
	foreignKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

export default model;
