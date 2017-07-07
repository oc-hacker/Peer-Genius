import path from 'path';

import config, { loadConfig } from './config';

let run = async () => {
	await loadConfig();
	require('./server');
	// require('./devServer');
	// childProcess.fork('./core/server.js');
};

run();