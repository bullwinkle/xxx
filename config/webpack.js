import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
//import ExtractPlugin from 'extract-text-webpack-plugin';
//import ManifestPlugin from 'manifest-revision-webpack-plugin';

const CWD = process.cwd();
const SRC = CWD + '/src';
const DIST = CWD + '/dist';
const PAGES = SRC + '/pages';
const PUBLIC = '/';

export default function ({dev, hot, test, port}) {

	const JS_NAME = '[name].js';
	const DEVTOOL = dev || test ? 'inline-source-map' : null;

	const cfg = {
		watch: dev,
		cache: dev,
		debug: dev,
		context: SRC,
		entry: {
			app: ['./app/app'],
			vendor: ['./vendor/vendor']
		},
		output: {
			path: DIST,
			filename: JS_NAME,
			publicPath: PUBLIC
		},
		devtool: DEVTOOL,
		resolve: {
			modulesDirectories: ['node_modules'],
			extensions: ['', '.js', '.json'],
			alias: {
				assets: SRC + '/assets',
				modules: SRC + '/modules'
			}
		},
		module: {
			loaders: [{
				test: /\.js$/,
				include: SRC,
				loader: 'babel!eslint!jscs'
			}, {
				test: /\.css$/,
				include: SRC,
				loader: 'style!css'
			}, {
				test: /\.html$/,
				include: SRC,
				loader: 'html'
			}, {
				test: /\.jade$/,
				include: PAGES,
				loader: 'jade?pretty=true'
			}, {
				test: /\.jade$/,
				include: SRC,
				exclude: PAGES,
				loader: 'raw!jade-html'
			}, {
				test: /\.styl$/,
				include: SRC,
				loader: 'style!css!stylus!stylint'
			}]
		},
		plugins: [
			new HtmlPlugin({
				filename: 'index.html',
				template: 'pages/index.jade'
			})
		]
	};

	if (test) {
		cfg.entry.test = ['./app/app'];
	}

	if (hot) {
		const entry = `webpack-dev-server/client`;
		const query = `localhost:${port}/`;
		cfg.entry.app.unshift(`${entry}?${query}`);
		cfg.devServer = {
			port,
			hot: true,
			stats: {
				colors: true
			}
		};
	}

	if (!dev) {
		cfg.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		);
	}

	return cfg;

}
