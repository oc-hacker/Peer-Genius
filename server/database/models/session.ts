import * as Sequelize from 'sequelize';

import config from '../../core/config';
import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface SessionAttributes {
	id: string,
	mentor: string,
	mentee: string,
	startTime: Date,
	endTime: Date | null,
	rating: number,
	comment: string
}

export interface SessionInstance extends Sequelize.Instance<SessionAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	id: string,
	mentor: string,
	mentee: string,
	startTime: Date,
	endTime: Date | null,
	rating: number,
	comment: string
}

const attributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	mentor: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	mentee: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	startTime: {
		type: Sequelize.DATE,
		allowNull: false
	},
	endTime: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: null
	},
	rating: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: null
	},
	comment: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	}
};

const blockUserEdit = (instance: SessionInstance) => {
	if (instance.changed('mentor')) {
		throw new ProhibitedEditError('Editing the mentor FK of sessions table is prohibited.')
	}
	if (instance.changed('mentee')) {
		throw new ProhibitedEditError('Editing the mentee FK of sessions table is prohibited.')
	}
};

const model: Sequelize.Model<SessionInstance, SessionAttributes> = admin.define<SessionInstance, SessionAttributes>('sessions', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config.devMode }); // Alter when in development mode

export default model