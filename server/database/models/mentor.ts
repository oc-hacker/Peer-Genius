import * as Sequelize from 'sequelize';
import { ProhibitedEditError } from '../errors';

import config from '../../core/config';
import { sequelizeAdmin as admin } from '../reference';
import user from './user';

export interface MentorAttributes {
	user: string,
	biology: boolean,
	geometry: boolean,
	algebra2: boolean,
	spanish: boolean
}

export interface MentorInstance extends Sequelize.Instance<MentorAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	user: string,
	biology: boolean,
	geometry: boolean,
	algebra2: boolean,
	spanish: boolean
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
	// The following indicate whether the user can teach the following subjects.
	biology: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	geometry: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	algebra2: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	spanish: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	// TODO More subjects
};

const blockUserEdit = (instance: MentorInstance) => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of mentors table is prohibited.')
	}
};

const model = admin.define('mentors', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config.devMode }); // Alter when in development mode

export default model