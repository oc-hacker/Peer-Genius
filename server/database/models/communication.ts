import * as Sequelize from "sequelize";

import config from "../../core/config";
import { sequelizeAdmin as admin } from "../reference";
import user from "./user";
import { ProhibitedEditError } from "../errors";

export interface CommunicationAttributes {
	user: string,
	whatsapp: boolean,
	hangout: boolean,
	messenger: boolean,
	imessage: boolean
}

export interface CommunicationInstance extends Sequelize.Instance<CommunicationAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	user: string,
	whatsapp: boolean,
	hangout: boolean,
	messenger: boolean,
	imessage: boolean
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
	// The following indicate whether the user is able to use each of these communication methods.
	whatsapp: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	hangout: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	messenger: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	imessage: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	// method: {
	// 	type: DataTypes.ENUM(methods),
	// 	allowNull: false
	// }
};

const blockUserEdit = (instance: CommunicationInstance) => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.')
	}
};

/** @typedef {Model} */
const model: Sequelize.Model<CommunicationInstance, CommunicationAttributes> = admin.define<CommunicationInstance, CommunicationAttributes>('communications', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model