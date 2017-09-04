// File for setting up node mysql
import * as mysql from 'mysql';
import RowData from 'mysql/lib/protocol/packets/RowDataPacket';
import * as Sequelize from 'sequelize';

const { DB_NAME, DB_ADMIN_USER, DB_ADMIN_PASS, DB_SLACK_USER, DB_SLACK_PASS } = process.env;

interface QueryResults extends Array<RowData> {
	affectedRows: number;
	changedRows: number;
	threadId: number;
}

export interface AsyncConnection extends mysql.IConnection {
	asyncQuery: (query: string, values?: any) => Promise<QueryResults>;
}

type ConnectionFactory = (...args: any[]) => Promise<AsyncConnection>;

// Promise-based connection creation
const getConnection = (pool: mysql.IPool): Promise<mysql.IConnection> => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(connection);
			}
		});
	});
};

const adminPool = mysql.createPool({
	host: 'localhost',
	database: DB_NAME,
	user: DB_ADMIN_USER,
	password: DB_ADMIN_PASS,
	timezone: '+00'
});

export const newConnection: ConnectionFactory = async (logSQL?: boolean) => {
	const connection: mysql.IConnection = await getConnection(adminPool);
	
	const asyncQuery = (query: string, values?: any): Promise<QueryResults> => {
		if (logSQL) {
			console.log([
				'[SQL Query Start]',
				query,
				'[SQL Query End]'
			].join('\n'));
		}
		return new Promise((resolve, reject) => {
			if (values) {
				connection.query(query, values, (err, result, fields) => {
					if (err) {
						reject(err);
					}
					else {
						resolve(result);
					}
				});
			}
			else {
				connection.query(query, (err, result, fields) => {
					if (err) {
						reject(err);
					}
					else {
						resolve(result);
					}
				});
			}
		});
	};
	
	return {
		...connection,
		asyncQuery
	};
};

const slackPool = mysql.createPool({
	host: 'localhost',
	database: DB_NAME,
	user: DB_SLACK_USER,
	password: DB_SLACK_PASS,
	timezone: '+00'
});

export const slackConnection: ConnectionFactory = async () => {
	const connection: mysql.IConnection = await getConnection(slackPool);
	
	const asyncQuery = (query: string): Promise<QueryResults> => {
		return new Promise((resolve, reject) => {
			connection.query(query, (err, result, fields) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(result);
				}
			});
		});
	};
	
	return {
		...connection,
		asyncQuery
	};
};

export const sequelizeAdmin: Sequelize.Sequelize = new Sequelize(
	DB_NAME,
	DB_ADMIN_USER,
	DB_ADMIN_PASS,
	{
		host: '127.0.0.1',
		dialect: 'mysql',
		logging: false,
		timezone: '+00:00'
	}
);
