import { without } from 'lodash';
import * as Sequelize from 'sequelize';

import config from '../../core/config';
import { sequelizeAdmin as admin } from '../reference';
import { ProhibitedEditError } from '../errors';

export interface UserAttributes {
	id?: string,
	firstName?: string,
	lastName?: string,
	birthday?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
	createdAt: Date,
	updatedAt: Date,
	
	id: string,
	firstName: string,
	lastName: string,
	birthday: Date
}

export const attributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: ''
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: ''
	},
	birthday: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		set(value) {
			if (value.year && value.month && value.date) {
				this.setDataValue('birthday', new Date(Date.UTC(value.year, value.month, value.date, 12))) // hour = 12 because things are weird when it's set to midnight.
			}
			else {
				this.setDataValue('birthday', value)
			}
		}
	}
};

export const exposedAttributes: Array<string> = without(Object.keys(attributes), 'id');

const blockIdEdit = (instance: UserInstance) => {
	if (instance.changed('id')) {
		throw new ProhibitedEditError('Editing the id PK of users table is prohibited.');
	}
};

const model: Sequelize.Model<UserInstance, UserAttributes> = admin.define<UserInstance, UserAttributes>('users', attributes);
model.beforeUpdate(blockIdEdit);
model.sync(); // Alter when in development mode

export default model