import * as Sequelize from 'sequelize';

import config from '../../core/config';
import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface SessionAttributes {
	user: string,
	startTime: Date,
	endTime: Date | null
}

export interface SessionInstance extends Sequelize.Instance<SessionAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	user: string,
	startTime: Date,
	endTime: Date | null
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
		primaryKey: true,
	},
	startTime: {
		type: Sequelize.DATE,
		allowNull: false
	},
	endTime: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: null
	}
};

const blockUserEdit = (instance: SessionInstance) => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of sessions table is prohibited.')
	}
};

const model: Sequelize.Model<SessionInstance, SessionAttributes> = admin.define<SessionInstance, SessionAttributes>('sessions', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config.devMode }); // Alter when in development mode

export default model