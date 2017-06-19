// File for setting up node mysql
import mysql from 'mysql';
import { mysqlUser, mysqlPassword, mysqlDatabase } from '../core/config';
import logger from '../log/logger';

const pool = mysql.createPool({
	host: 'localhost',
	user: mysqlUser,
	password: mysqlPassword,
	database: mysqlDatabase,
	timezone: '+00'
});

// Add async function
pool.asyncConnection = async() => {
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

const newConnection = async(logSQL) => {
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
			logger.info(query);
		}
		else {
			logger.trace(query);
		}
		return new Promise((resolve, reject) => {
			if (values) {
				connection.query(query, values, (err, results, fields) => {
					if (err) {
						reject(err);
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
	
	// Override connection.close() to connection.release()
	connection.close = () => {
		connection.release();
	};
	
	// Convenience function to allow the connection to query and then close
	connection.queryAndRelease = async(query, values) => {
		let result = await connection.asyncQuery(query, values);
		connection.release();
		return await result;
	};
	
	return connection;
};

export default newConnection;
