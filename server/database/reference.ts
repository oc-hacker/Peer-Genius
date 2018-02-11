// File for setting up node mysql
import * as mysql from 'mysql2/promise';
import * as Sequelize from 'sequelize';

const { DB_HOST, DB_NAME, DB_ADMIN_USER, DB_ADMIN_PASS, DB_SLACK_USER, DB_SLACK_PASS } = process.env;

interface QueryResults extends Array<mysql.RowDataPacket> {
	affectedRows: number;
	changedRows: number;
	threadId: number;
}

export interface AsyncConnection extends mysql.Connection {
	asyncQuery: (query: string, values?: any) => Promise<QueryResults>;
}

const adminPool = mysql.createPool({
	host: DB_HOST,
	database: DB_NAME,
	user: DB_ADMIN_USER,
	password: DB_ADMIN_PASS,
	timezone: '+00'
});

export const newConnection = async (logSQL?: boolean): Promise<mysql.PoolConnection> => {
	return await adminPool.getConnection();
};

const slackPool = mysql.createPool({
	host: DB_HOST,
	database: DB_NAME,
	user: DB_SLACK_USER,
	password: DB_SLACK_PASS,
	timezone: '+00'
});

export const slackConnection = async (): Promise<mysql.PoolConnection> => {
	return await slackPool.getConnection();
};

export const sequelizeAdmin: Sequelize.Sequelize = new Sequelize(
	DB_NAME,
	DB_ADMIN_USER,
	DB_ADMIN_PASS,
	{
		host: (DB_HOST === 'localhost' ? '127.0.0.1' : DB_HOST),
		dialect: 'mysql',
		logging: false,
		timezone: '+00:00'
	}
);
