import Sequelize from 'sequelize';
import mysql from 'mysql';
import {
	mysqlDatabase, mysqlUser, mysqlPassword, backupPath
} from '../../core/config.js';
import {
	sequelizeAdmin as admin
} from '../reference'
import child_process from 'child_process';
import fs from 'fs';
import timeUtils from './timeUtils';
import logger from '../../log/logger';

const backupName = 'backup';

class DatabaseUtilities {
	constructor() {
		// dbUtils uses the QueryInterface to do some things the sequelize models cannot.
		this._interface = admin.getQueryInterface();
	}
	
	/**
	 * Updates the table, creating or deleting columns as needed.
	 *
	 * @param {Object} [model] The sequelize model of the table to update
	 * @param {Object} [newAttributes] The updated attributes the table should have
	 * @param {Boolean} [remove] Whether to remove the fields that do not exist in the new model
	 */
	async updateTable(model, newAttributes, remove) {
		// Sync the model first
		await model.sync({
			force: false
		}).catch(err => {
			if (err) {
				console.log(err);
			}
		});
		// Acquire the current model
		let currentAttributes = null;
		
		await this._interface.describeTable(model.tableName).then(result => {
			currentAttributes = result;
		});
		// Update the database to haeve all columns matching the current columns
		for (let prop in newAttributes) {
			// Retrieve database column name
			let columnName = prop;
			if (newAttributes[prop].field != null) {
				columnName = newAttributes[prop].field;
			}
			
			if (!(columnName in currentAttributes)) {
				// Add column if it does not exist
				await this._interface.addColumn(model.tableName, columnName, newAttributes[prop]);
			}
		}
		// Check if we should remove columns
		if (remove) {
			// Remove attributes that should not exist
			for (let prop in currentAttributes) {
				if (!currentAttributes.hasOwnProperty(prop)) continue;
				
				// Iterate over the newAttributes to determine whether the prop should be kept.
				let existsInNewAttributes = false;
				
				for (let newProp in newAttributes) {
					let columnName = newProp;
					if (newAttributes[newProp].field != null) {
						columnName = newAttributes[newProp].field;
					}
					
					if (columnName == prop) {
						existsInNewAttributes = true;
						break;
					}
				}
				
				// Remove column. Exclude the three sequelize-created columns.
				if (!existsInNewAttributes && prop != 'id' && prop != 'createdAt' && prop != 'updatedAt') {
					// Get column name
					let columnName = prop;
					if (currentAttributes[prop].field != null) {
						columnName = currentAttributes[prop].field
					}
					
					await this._interface.removeColumn(model.name, columnName);
				}
			}
		}
		
		// Syncronize the model and table.
		model.sync({
			force: false
		});
		
		logger.info(`Updated model: ${model.tableName}`);
	}
	
	/**
	 * Makes a backup of all the tables in the database.
	 */
	async makeBackup() {
		/*
		 // Create database if it does not exist
		 backupConnection.query(`CREATE DATABASE IF NOT EXISTS backup`);
		 backupConnection.query(`USE backup`);
		 
		 let tableNames = await this._interface.showAllTables();
		 // Make timestamp
		 let timeStamp = await timeUtils.makeTimestamp();
		 // For each table in the database
		 for (let name of tableNames) {
		 // Sequelize functions too confusing, resorting to raw queries.
		 backupConnection.query(`DROP TABLE IF EXISTS ${name}_${timeStamp}`);
		 backupConnection.query(`CREATE TABLE ${name}_${timeStamp} AS SELECT * FROM ${mySQLDatabase}.${name}`);
		 }
		 */
		// Make the directory. Doens't matter if it already exists.
		await child_process.exec(`mkdir ${backupPath}`);
		
		// Determine the file name
		// Load all the file names in the backup directory and use ordinal to get the next file name
		let nextBackup = 1;
		let fileNames = await fs.readdirSync(backupPath);
		
		for (let name of fileNames) {
			let match = /backup([0-9]+).sql/g.exec(name);
			if (match) {
				try {
					let backupIndex = parseInt(match[1]);
					if (nextBackup <= backupIndex) {
						nextBackup = backupIndex + 1;
					}
				}
				catch (error) {
				}
			}
		}
		
		// Delete old files
		// This method will keep at least 20 backups and at least all the backups within 90 days.
		let timeLimit = 1000 * 60 * 60 * 24 * 90; // 1000ms/s * 60s/min * 60min/hr * 24hr/day * 90days
		
		// Sort the files so that the latest files come first
		let sortedFiles = await fileNames.map(name => ({
			name: name,
			modifiedTime: fs.statSync(backupPath + name).mtime
		})).sort((a, b) => (b.modifiedTime.getTime() - a.modifiedTime.getTime()));
		
		let lastFile = null;
		let now = new Date();
		for (let file of sortedFiles) {
			// Keep all of today's backups
			if (await timeUtils.sameDay(file.modifiedTime, now)) {
				continue;
			}
			
			// Keep 1 backup per day for earlier backups.
			if (lastFile && await timeUtils.sameDay(file.modifiedTime, lastFile.modifiedTime)) {
				console.log('Removing', file.name, 'modified on', file.modifiedTime.toDateString());
				fs.unlink(backupPath + file.name);
			}
			else if (now.getTime() - file.modifiedTime.getTime() > timeLimit) {
				console.log('Removing', file.name, 'modified on', file.modifiedTime.toDateString());
				fs.unlink(backupPath + file.name);
			}
			else {
				lastFile = file;
			}
		}
		
		let fileName = `${backupPath}${backupName}${nextBackup}.sql`;
		
		logger.info("Creating backup: " + fileName);
		// Dump the database'
		// Temporarily disable history
		child_process.exec(`mysqldump -u ${mysqlUser} -p${mysqlPassword} --databases ${mysqlDatabase} > ${fileName}`);
	}
}

const dbUtils = new DatabaseUtilities();
export default dbUtils;