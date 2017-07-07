// Runs custom webpack server in order to work with react router
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';
import webpackConfig from '../../webpack.dev';

if (config.devMode) {
	const app = express();
	const webpackCompiler = webpack(webpackConfig);
	
	app.use(webpackDevMiddleware(webpackCompiler));
	
	app.use(webpackHotMiddleware(webpackCompiler));
	
	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, '../../public/index.html'));
	});
	
	app.listen(8081, function(err) {
		if(err) {
			return console.log(err);
		}
		
		console.log('Server running on port: 8081');
	})
}