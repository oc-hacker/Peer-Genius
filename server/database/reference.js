// File for setting up node mysql
import mysql from 'mysql';
import RowData from 'mysql/lib/protocol/packets/RowDataPacket';
import Sequelize from 'sequelize';

import config from '../core/config';

const pool = mysql.createPool({
	host: 'localhost',
	user: config.mysqlUser,
	password: config.mysqlPassword,
	database: config.mysqlDatabase,
	timezone: '+00'
});

// Add async function
pool.asyncConnection = async () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(connection);
			}
		})
	})
};

export const newConnection = async (logSQL) => {
	let connection = await pool.asyncConnection();
	
	// Add promise functions to work with async
	/**
	 *
	 * @param query
	 * @param values
	 * @returns {Promise.<RowData>}
	 */
	connection.asyncQuery = (query, values) => {
		if (logSQL) {
			console.log('[SQL Query Start]');
			console.log(query);
			console.log('[SQL Query End]')
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
	};
	
	return connection;
};

export const sequelizeAdmin = new Sequelize(
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
