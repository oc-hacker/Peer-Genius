var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?quiet=true',
		path.resolve(__dirname, './client/index.dev.js')
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'app.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		publicPath: '/',
		contentBase: './public',
		hot: true
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};