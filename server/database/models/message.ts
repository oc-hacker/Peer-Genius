import * as Sequelize from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface MessageAttributes {
	id?: string,
	from?: string,
	to?: string,
	message?: string
}

export interface MessageInstance extends Sequelize.Instance<MessageAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	id: string,
	from: string,
	to: string,
	message: string
}

const attributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	from: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	to: {
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
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of messages table is prohibited.')
	}
};

const model: Sequelize.Model<MessageInstance, MessageAttributes> = admin.define<MessageInstance, MessageAttributes>('messages', attributes);
model.beforeUpdate(blockUserEdit);
model.sync(); // Alter when in development mode

export default model