import * as Sequelize from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import course from './course';
import { ProhibitedEditError } from '../errors';

export interface SessionAttributes {
	id?: string;
	newbieId?: string;
	guruId?: string;
	courseId?: string;
	scheduledStart?: Date;
	scheduledEnd?: Date;
	startTime?: Date;
	endTime?: Date;
	rating?: number;
	comment?: string;
	assignment: string;
}

export interface SessionInstance extends Sequelize.Instance<SessionAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id: string;
	newbieId: string;
	guruId: string;
	courseId: string;
	scheduledStart: Date;
	scheduledEnd: Date;
	startTime?: Date;
	endTime?: Date;
	rating?: number;
	comment?: string;
	assignment: string;
}

const attributes: Sequelize.DefineAttributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	newbieId: {
		type: Sequelize.UUID,
		allowNull: false,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	guruId: {
		type: Sequelize.UUID,
		allowNull: true,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	courseId: {
		type: Sequelize.UUID,
		allowNull: false,
		references: {
			model: course,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		}
	},
	scheduledStart: {
		type: Sequelize.DATE,
		allowNull: false
	},
	scheduledEnd: {
		type: Sequelize.DATE,
		allowNull: false
	},
	startTime: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: null
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
	},
	assignment: {
		type: Sequelize.STRING,
		allowNull: false
	}
};

const blockUserEdit = (instance: SessionInstance) => {
	if (instance.changed('guruId')) {
		throw new ProhibitedEditError('Editing the guru FK of sessions table is prohibited.');
	}
	if (instance.changed('newbieId')) {
		throw new ProhibitedEditError('Editing the newbie FK of sessions table is prohibited.');
	}
};

const model: Sequelize.Model<SessionInstance, SessionAttributes> = admin.define<SessionInstance, SessionAttributes>('sessions', attributes, {
	charset: 'utf8'
});
model.beforeUpdate(blockUserEdit);

model.belongsTo(user, {
	as: 'guru',
	foreignKey: 'newbieId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasMany(model, {
	as: 'guruSession',
	foreignKey: 'newbieId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

model.belongsTo(user, {
	as: 'newbie',
	foreignKey: 'guruId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasMany(model, {
	as: 'newbieSession',
	foreignKey: 'guruId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

model.belongsTo(course, {
	foreignKey: 'courseId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
course.hasMany(model, {
	foreignKey: 'courseId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

export default model;
