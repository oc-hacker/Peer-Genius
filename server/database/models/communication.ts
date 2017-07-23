import { without } from 'lodash';
import * as Sequelize from 'sequelize';

import config from '../../core/config';
import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

export interface CommunicationAttributes {
	user: string,
	skype: string,
	hangouts: string,
	messenger: string,
	imessage: string,
	whatsapp: string,
	viber: string,
	tango: string,
	aim: string,
	oovoo: string
}

export interface CommunicationInstance extends Sequelize.Instance<CommunicationAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	user: string,
	skype: string,
	hangouts: string,
	messenger: string,
	imessage: string,
	whatsapp: string,
	viber: string,
	tango: string,
	aim: string,
	oovoo: string
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
	skype: {
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
	whatsapp: {
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
	aim: { // AIM Video Chat
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	oovoo: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	}
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