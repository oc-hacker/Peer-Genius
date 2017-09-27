import * as Sequelize from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface MessageAttributes {
	id?: string;
	fromId?: string;
	toId?: string;
	message?: string;
}

export interface MessageInstance extends Sequelize.Instance<MessageAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id: string;
	fromId: string;
	toId: string;
	message: string;
}

const attributes: Sequelize.DefineAttributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	fromId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	toId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	message: {
		type: Sequelize.STRING,
		allowNull: false
	}
};

const blockUserEdit = (instance: MessageInstance) => {
	if (instance.changed('fromId') || instance.changed('toId')) {
		throw new ProhibitedEditError('Editing the user FK of messages table is prohibited.');
	}
};

const model: Sequelize.Model<MessageInstance, MessageAttributes> = admin.define<MessageInstance, MessageAttributes>('messages', attributes);
model.beforeUpdate(blockUserEdit);

model.belongsTo(user, {
	as: 'incomingMessage',
	foreignKey: 'toId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasMany(model, {
	as: 'incomingMessage',
	foreignKey: 'toId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
model.belongsTo(user, {
	as: 'outgoingMessage',
	foreignKey: 'fromId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasMany(model, {
	as: 'outgoingMessage',
	foreignKey: 'fromId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

model.sync(); // Alter when in development mode
export default model;
