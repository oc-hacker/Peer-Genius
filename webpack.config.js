module.exports = function(env) {
	// Default to production
	return require(`./webpack.${env || 'prod'}.js`)
};
