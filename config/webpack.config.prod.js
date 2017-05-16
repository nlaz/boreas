'use strict';

var webpack = require('webpack');
var paths = require('./paths');

var publicPath = '/';
var config = {
	entry: [
		paths.appIndexJs
	],
	output: {
		path: paths.appBuild,
		filename: 'bundle.js',
		publicPath: publicPath,
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				include: paths.appClient,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true
				}
			},
			{
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				BUILD: true,
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	node: {
		fs: 'empty',
	}
};

module.exports = config;