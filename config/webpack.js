import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractPlugin from 'extract-text-webpack-plugin';

const CWD = process.cwd();
const SRC = CWD + '/src';
const DIST = CWD + '/dist';
const PAGES = SRC + '/pages';
const PUBLIC = '/';

export default function ({dev, hot, test, port}) {

	const DEVTOOL = dev || test ? 'inline-source-map' : 'source-map';
	const JS_NAME = dev ? '[name].js' : '[name]-[chunkhash].js';
	const CSS_NAME = dev ? '[name].css' : '[name]-[contenthash].css';
	const ASSET_NAME = '[name]-[hash].[ext]';

	const cfg = {
		watch: dev,
		cache: dev,
		debug: dev,
		context: SRC,
		devtool: DEVTOOL,
		entry: {
			app: ['app/app'],
			vendor: ['vendor/vendor']
		},
		output: {
			path: DIST,
			filename: JS_NAME,
			publicPath: PUBLIC
		},
		resolve: {
			extensions: ['', '.js', '.json'],
			modules: [
				SRC,
				SRC + '/modules',
				'node_modules'
			],
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
				loader: ExtractPlugin.extract('css')
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
				loader: ExtractPlugin.extract('css!stylus!stylint')
			}, {
				test: /\.(svg|png|jpg|gif|eot|ttf|woff|woff2)$/,
				loader: 'url-loader?limit=1&name=' + ASSET_NAME
			}]
		},
		plugins: [
			new ExtractPlugin(CSS_NAME),
			new HtmlPlugin({
				filename: 'index.html',
				template: 'pages/index.jade'
			})
		]
	};

	//if (test) {
	//	cfg.entry.test = ['./app/app'];
	//}

	if (hot) {
		const entry = `webpack-dev-server/client`;
		const query = `http://localhost:${port}/`;
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
