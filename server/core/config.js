import fs from 'fs';
import path from 'path';

export default {
	mysqlDatabase: '',
	mysqlUser: '',
	mysqlPassword: '',
	sessionJWTKey: '',
	sessionJWTExpire: '1d',
	serverPort: 80,
	devServerPort: 8081,
	backupPath: 'backup',
	devMode: false,
	mailerXOAuth2: {
	
	}
};

let configPath = path.join(__dirname, './config.json');

/**
 * Transfers data from <code>source</code> to <code>sink</code>.
 * @param source
 * @param sink
 * @return changed Whether the sink's expectations have changed.
 */
const transfer = async (source, sink) => {
	let changed = false;
	
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
	// console.log(fs);
	
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
		let changed = await transfer(config, exports.default);
		
		if (changed) {
			// Save the config file again
			fs.writeFileSync(configPath, await JSON.stringify(exports.default, null, '\t'));
		}
		
		console.log('Config loaded.');
	}
};

