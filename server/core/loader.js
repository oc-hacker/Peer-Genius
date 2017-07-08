import path from 'path';

import config, { loadConfig } from './config';

let run = async () => {
	await loadConfig();
	require('./server');
	// childProcess.fork('./core/server.js');
};

run();