import * as Sequelize from 'sequelize';
import { AssociationOptions } from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import session from './session';
import { ProhibitedEditError } from '../errors';

export interface MessageAttributes {
	id?: string;
	senderId?: string;
	sessionId?: string;
	message?: string;
}

export interface MessageInstance extends Sequelize.Instance<MessageAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id: string;
	senderId: string;
	sessionId: string;
	message: string;
}

const attributes: Sequelize.DefineAttributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	senderId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	sessionId: {
		type: Sequelize.UUID,
		references: {
			model: session,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	message: {
		type: Sequelize.TEXT({length: 'medium'}),
		allowNull: false
	}
};

const blockUserEdit = (instance: MessageInstance) => {
	if (instance.changed('senderId')) {
		throw new ProhibitedEditError('Editing the user FK of messages table is prohibited.');
	}
	if (instance.changed('sessionId')) {
		throw new ProhibitedEditError('Editing the session FK of messages table is prohibited.');
	}
};

const model: Sequelize.Model<MessageInstance, MessageAttributes> = admin.define<MessageInstance, MessageAttributes>('messages', attributes);
model.beforeUpdate(blockUserEdit);

const hookOptions: AssociationOptions = {
	onUpdate: 'cascade',
	onDelete: 'cascade'
};

model.belongsTo(user, {
	as: 'sender',
	foreignKey: 'senderId',
	...hookOptions
});
user.hasMany(model, {
	as: 'sentMessages',
	foreignKey: 'senderId',
	...hookOptions
});

model.belongsTo(session, {
	foreignKey: 'sessionId',
	...hookOptions
});
session.hasMany(model, {
	foreignKey: 'sessionId',
	...hookOptions
});

model.sync(); // Alter when in development mode
export default model;
