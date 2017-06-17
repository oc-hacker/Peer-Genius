import Sequelize from 'sequelize';
import { mysqlDatabase, mysqlUser, mysqlPassword } from '../core/config.js';

export const sequelizeAdmin = new Sequelize(
	mysqlDatabase, mysqlUser, mysqlPassword,
	{
		host: 'localhost',
		dialect: 'mysql',
		logging : false,
		timezone: '+00:00'
	}
);
