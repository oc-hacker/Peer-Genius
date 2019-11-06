import * as Sequelize from 'sequelize';

import { sequelizeAdmin as admin } from '../reference';

export interface CourseAttributes {
	id: string;
	name: string;
}

export interface CourseInstance extends Sequelize.Instance<CourseAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	id: string;
	name: string;
}

const attributes: Sequelize.DefineAttributes = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: ''
	}
};

const model: Sequelize.Model<CourseInstance, CourseAttributes> = admin.define<CourseInstance, CourseAttributes>('courses', attributes as Sequelize.DefineModelAttributes<CourseAttributes>, {
	charset: 'utf8'
});

model.sync();
export default model;
