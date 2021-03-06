import * as Sequelize from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface NotificationAttributes {
	id?: string;
	toId?: string;
	message?: string;
}

export interface NotificationInstance extends Sequelize.Instance<NotificationAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id?: string;
	toId?: string;
	message?: string;
}

const attributes: Sequelize.DefineAttributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	toId: {
		type: Sequelize.UUID,
		allowNull: false
	},
	notification: {
		type: Sequelize.STRING,
		allowNull: false
	}
};

const blockUserEdit = (instance: NotificationInstance) => {
	if (instance.changed('toId')) {
		throw new ProhibitedEditError('Editing the user FK of messages table is prohibited.');
	}
};

const model: Sequelize.Model<NotificationInstance, NotificationAttributes> = admin.define<NotificationInstance, NotificationAttributes>('messages', attributes, {
	charset: 'utf8'
});
model.beforeUpdate(blockUserEdit);

model.belongsTo(user, {
	foreignKey: 'toId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasMany(model, {
	foreignKey: 'toId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

export default model;
