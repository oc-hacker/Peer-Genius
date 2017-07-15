var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, './client/index.prod.js')
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			output: {
				comments: false
			},
			exclude: [/\.min\.js$/gi]
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};