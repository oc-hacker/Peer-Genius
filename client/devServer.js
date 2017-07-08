// Runs custom webpack server in order to work with react router
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.dev';

const port = 8081;

const app = express();
const webpackCompiler = webpack(webpackConfig, (error, stats) => {
	if (error) {
		console.error('Error when compiling:');
		console.error(error);
	}
	else {
		console.log(stats.toString({
			chunks: false,
			colors: true
		}))
	}
});

app.use(webpackDevMiddleware(webpackCompiler, {
	publicPath: '/',
	stats: {
		chunks: false,
		colors: true
	}
}));

app.use(webpackHotMiddleware(webpackCompiler));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, error => {
	if (error) {
		return console.error(error);
	}
	
	console.log(`Webpack dev server running on port: ${port}`);
});