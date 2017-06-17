// TODO everything
require('./core/config.js').loadConfig().then(function() {
	console.log('Launching...');
	require('./core/server.js');
	require('./core/backup.js');
	console.log('Server files imported.');
});
