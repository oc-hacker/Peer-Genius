import * as fs from 'fs';
import * as path from 'path';

interface Config {
	mysqlDatabase: string;
	mysqlAdmin: {
		user: string;
		password: string;
	}
	sessionJWTKey: string;
	sessionJWTExpire: string | number;
	serverPort: number;
	devServerPort: number;
	backupPath: string;
	devMode: boolean;
	mailerXOAuth2: {
		accessUrl: string;
		customHeaders: object;
		customParams: object;
	}
	slackToken: string;
	mysqlSlack: {
		user: string;
		password: string;
	}
}

let config: Config = {
	mysqlDatabase: '',
	mysqlAdmin: {
		user: '',
		password: '',
	},
	sessionJWTKey: '',
	sessionJWTExpire: '1d',
	serverPort: 80,
	devServerPort: 8081,
	backupPath: 'backup',
	devMode: false,
	mailerXOAuth2: {
		accessUrl: '',
		customHeaders: {},
		customParams: {}
	},
	slackToken: '',
	mysqlSlack: {
		user: '',
		password: ''
	}
};

let configPath = path.resolve(__dirname, './config.json');

/**
 * Transfers data from <code>source</code> to <code>sink</code>.
 * @param source
 * @param sink
 * @return changed Whether the sink's expectations have changed.
 */
const transfer = async (source: any, sink: any): Promise<boolean> => {
	let changed: boolean = false;
	
	for (let key in sink) {
		if (sink.hasOwnProperty(key)) {
			if (key in source) {
				// Check for deep copy
				if (typeof sink[key] === 'object') {
					if (typeof source[key] === 'object') {
						changed = (await transfer(source[key], sink[key])) || changed;
					}
					else {
						changed = true;
					}
				}
				else {
					sink[key] = source[key];
				}
			}
			else {
				changed = true;
			}
		}
	}
	
	return changed;
};

export const loadConfig = async () => {
	console.log(`Accessing config at path ${configPath}`);
	
	let fileReadSuccess = true;
	let importedConfig = {};
	try {
		// Load file
		await fs.accessSync(configPath, fs.constants.R_OK | fs.constants.W_OK);
		importedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	}
	catch (error) {
		fileReadSuccess = false;
		console.log('Config file missing or corrupted. Resetting file...');
		fs.writeFile(configPath, await JSON.stringify(config, null, '\t'), null);
	}
	
	if (fileReadSuccess) {
		let changed = await transfer(importedConfig, config);
		
		if (changed) {
			// Save the config file again
			fs.writeFileSync(configPath, await JSON.stringify(config, null, '\t'));
		}
		
		console.log('Config loaded.');
	}
};

export default config;

