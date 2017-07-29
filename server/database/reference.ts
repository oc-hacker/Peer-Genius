// File for setting up node mysql
import * as mysql from 'mysql';
import RowData from 'mysql/lib/protocol/packets/RowDataPacket';
import * as Sequelize from 'sequelize';

import config from '../core/config';

const pool = mysql.createPool({
	host: 'localhost',
	user: config.mysqlUser,
	password: config.mysqlPassword,
	database: config.mysqlDatabase,
	timezone: '+00'
});

// Async connection creation
const asyncConnection = (): Promise<mysql.IConnection> => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(connection);
			}
		})
	});
};

interface QueryResults extends Array<RowData> {
	affectedRows: number,
	changedRows: number,
	threadId: number
}

export interface AsyncConnection extends mysql.IConnection {
	asyncQuery: (string, any?) => Promise<QueryResults>
}

export const newConnection = async (logSQL?: boolean): Promise<AsyncConnection> => {
	const connection: mysql.IConnection = await asyncConnection();
	
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
				connection.query(query, values, (err, results, fields) => {
					if (err) {
						reject(Error([ 'Unexpected error: ' + err.message, 'Query:', query ].join('\n')));
					}
					else {
						resolve(results);
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
	}
};

export const sequelizeAdmin: Sequelize.Sequelize = new Sequelize(
	config.mysqlDatabase,
	config.mysqlUser,
	config.mysqlPassword,
	{
		host: 'localhost',
		dialect: 'mysql',
		logging: false,
		timezone: '+00:00'
	}
);
