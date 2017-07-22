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

export interface AsyncConnection extends mysql.IConnection {
	asyncQuery: (string, any?) => Promise<RowData[] | any | void>,
	release: () => void
}

export const newConnection = async (logSQL?: boolean): Promise<AsyncConnection> => {
	const connection: mysql.IConnection = await asyncConnection();
	
	return {
		...connection,
		
		/**
		 *
		 * @param query
		 * @param values
		 * @returns {Promise.<RowData>}
		 */
		asyncQuery: (query: string, values?: any) => {
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
							reject(Error(['Unexpected error: ' + err.message, 'Query:', query].join('\n')));
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
			})
		},
		
		release: () => {
			connection.release()
		}
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
