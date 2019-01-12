import * as Sequelize from 'sequelize';
import { AssociationOptions } from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import session from './session';
import { ProhibitedEditError } from '../errors';

export interface ReportAttributes {
	id?: string;
	sessionId?: string;
	reporterId?: string;
	reportedId?: string;
}

export interface ReportInstance extends Sequelize.Instance<ReportAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id: string;
	sessionId?: string;
	reporterId?: string;
	reportedId?: string;
}

const attributes: Sequelize.DefineAttributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
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
	reporterId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	reportedId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	}
};

const model: Sequelize.Model<ReportInstance, ReportAttributes> = admin.define<ReportInstance, ReportAttributes>('messages', attributes, {
	charset: 'utf8'
});

export default model;
