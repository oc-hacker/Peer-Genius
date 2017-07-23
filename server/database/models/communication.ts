import { without } from 'lodash';
import * as Sequelize from 'sequelize';

import config from '../../core/config';
import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface CommunicationAttributes {
	user: string,
	whatsapp: string,
	hangouts: string,
	messenger: string,
	imessage: string
}

export interface CommunicationInstance extends Sequelize.Instance<CommunicationAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	user: string,
	whatsapp: string,
	hangouts: string,
	messenger: string,
	imessage: string
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
	// If null, the user is not using this communication method. If set, the value points to the user's account in that app.
	whatsapp: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	hangouts: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	messenger: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	imessage: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	skype: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	viber: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	tango: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	aim: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	oovoo: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	// method: {
	// 	type: DataTypes.ENUM(methods),
	// 	allowNull: false
	// }
};

export const communicationMethods: Array<string> = without(Object.keys(attributes), 'user');

const blockUserEdit = (instance: CommunicationInstance) => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.')
	}
};

/** @typedef {Model} */
const model: Sequelize.Model<CommunicationInstance, CommunicationAttributes> = admin.define<CommunicationInstance, CommunicationAttributes>('communications', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config.devMode }); // Alter when in development mode

export default model