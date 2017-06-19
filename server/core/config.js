import fs from 'fs';

import logger from '../log/logger';

let defaultValues = {
	mysqlDatabase: '',
	mysqlUser: '',
	mysqlPassword: '',
	serverPort: 8080,
	backupPath: 'backup/',
	logLevel: 2
};

export const loadConfig = async () => {
	let config = {};
	
	// Try to load the file
	logger.info("Accessing config...");
	try {
		let fsConstants = fs.constants || fs;
		await fs.accessSync('./server/core/config.json', fsConstants.R_OK | fsConstants.W_OK);
		config = await JSON.parse(await fs.readFileSync('./server/core/config.json'));
		
		let changed = false;
		// Initialize all config values not initialized in the config file
		for (let option in defaultValues) {
			if (defaultValues.hasOwnProperty(option) && !config.hasOwnProperty(option)) {
				config[option] = defaultValues[option];
				changed = true;
			}
		}
		if (changed) {
			// Save the config file again
			fs.writeFileSync('./server/core/config.json', await JSON.stringify(config, null, '\t'));
		}
		
		logger.info("Config loaded.");
		logger.level = config.logLevel;
	}
	catch (error) {
		logger.info("Config not accessible or corrupted, (re-)creating config file...");
		config = defaultValues;
		fs.writeFileSync('./server/core/config.json', await JSON.stringify(config, null, '\t'));
	}
	
	logger.trace(await JSON.stringify(config, null, '\t'));
	module.exports = config;
};