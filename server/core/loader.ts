import { loadConfig } from "./config";

let run = async () => {
	await loadConfig();
	require('./server');
};

run();