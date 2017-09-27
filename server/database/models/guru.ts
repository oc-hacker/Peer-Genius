import * as Sequelize from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';
import user from './user';
import course from './course';
import { ProhibitedEditError } from '../errors';

export interface GuruAttributes {
	id?: number;
	userId?: string;
	courseId?: string;
	enabled?: boolean;
}

export interface GuruInstance extends Sequelize.Instance<GuruAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id: number;
	userId: string;
	courseId: string;
	enabled: boolean;
}

const attributes: Sequelize.DefineAttributes = {
	userId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		unique: 'guru',
	},
	courseId: {
		type: Sequelize.UUID,
		references: {
			model: course,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		unique: 'guru'
	},
	// 'Enabled' allows the program to set this to false rather than deleting a row when a guru unselects this course.
	enabled: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
};

const blockUserEdit = (instance: GuruInstance) => {
	if (instance.changed('userId')) {
		throw new ProhibitedEditError('Editing the user FK of gurus table is prohibited.');
	}
};

const model: Sequelize.Model<GuruInstance, GuruAttributes> = admin.define<GuruInstance, GuruAttributes>('gurus', attributes);
model.beforeUpdate(blockUserEdit);

model.belongsTo(user, {
	foreignKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasMany(model, {
	foreignKey: 'userId',
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

model.sync();
export default model;
