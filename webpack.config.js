/**
 * Webpack build-system configuration
 */

'use strict';

module.exports = (() => {
	const {
		CommonsChunkPlugin,
		UglifyJsPlugin,
		DedupePlugin,
	} = require('webpack').optimize;

	const config = {};

	config.entry = {
		app: './src/main.ts',
		common: './src/vendor.ts',
	};

	config.output = {
		path: `${__dirname}/dist/`,
		filename: '[name].js',
		chunkFilename: '[name].chunk[id].js',
	};

	config.resolve = {
		root: `${__dirname}/src/`,
		extensions: ['', '.ts', '.js', '.pug', '.scss'],
	};

	config.devtool = 'source-map';

	config.module = {
		loaders: [
			{
				test: /\.component\.ts$/,
				loader: 'ts!ng2-component',
			},

			{
				test: /\.ts$/,
				loader: 'ts',
				exclude: [
					/\.component\.ts$/,
					/node_modules/,
				],
			},

			{
				test: /\.pug$/,
				loader: 'pug-html',
			},

			{
				test: /\.scss$/,
				loader: 'raw!sass',
			},
		],
	};

	config.plugins = [
		new CommonsChunkPlugin({
			name: ['common'],
			filename: '[name].js',
		}),
	];

	if (inProduction()) { // prod-only plugins
		config.plugins.push(new UglifyJsPlugin({
			compress: {warnings: false},
		}));

		config.plugins.push(new DedupePlugin());
	}

	// ts-loader configuration
	config.ts = {
		silent: true,
	};

	// do not watch in production
	// config.watch = !inProduction();
	config.inProduction = inProduction;

	return config;
}).call(global);

function inProduction(env = process.env.NODE_ENV || 'dev') {
	return Boolean(String(env).match(/^prod(uction)?$/i));
}
