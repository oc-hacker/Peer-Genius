import fs from 'fs';

export default {
	mysqlDatabase: '',
	mysqlUser: '',
	mysqlPassword: '',
	sessionJWTKey: '',
	sessionJWTExpire: '1d',
	serverPort: 80,
	backupPath: '',
	betaMode: false
};

let configPath = './config.json';

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
		fs.writeFile(configPath, await JSON.stringify(module.exports, null, '\t'))
	}
	
	if (fileReadSuccess) {
		let changed = false; // Keeps track of whether the config file needs to be changed.
		for (let key in exports) {
			if (exports.hasOwnProperty(key)) {
				if (key in config) {
					exports[key] = config[key];
				}
				else {
					// New entry
					config[key] = exports[key];
					changed = true;
				}
			}
		}
		
		if (changed) {
			// Save the config file again
			fs.writeFileSync(configPath, await JSON.stringify(config, null, '\t'));
		}
		
		console.log('Config loaded.');
	}
};

