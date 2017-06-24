import fs from 'fs';
import _ from 'lodash';

export default {
	mysqlDatabase: '',
	mysqlUser: '',
	mysqlPassword: '',
	sessionJWTKey: '',
	sessionJWTExpire: '1d',
	serverPort: 80,
	backupPath: '',
	devMode: false
};

let configPath = './core/config.json';

export const loadConfig = async () => {
	console.log("Accessing config...");
	
	let fileReadSuccess = true;
	let config = {};
	try {
		// Load file
		let fsConstants = fs.constants || fs; // Different node versions have different definitions.
		await fs.accessSync(configPath, fsConstants.R_OK | fsConstants.W_OK);
		config = await JSON.parse(await fs.readFileSync(configPath))
	}
	catch (error) {
		fileReadSuccess = false;
		console.log('Config file missing or corrupted. Resetting file...');
		fs.writeFile(configPath, await JSON.stringify(exports.default, null, '\t'))
	}
	
	if (fileReadSuccess) {
		let changed = false; // Keeps track of whether the config file needs to be changed.
		for (let key in exports.default) {
			if (exports.default.hasOwnProperty(key)) {
				if (key in config) {
					exports.default[key] = config[key];
				}
				else {
					// New entry
					changed = true;
				}
			}
		}
		
		if (changed) {
			// Save the config file again
			fs.writeFileSync(configPath, await JSON.stringify(exports.default, null, '\t'));
		}
		
		console.log('Config loaded.');
	}
};

