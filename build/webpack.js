import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
//import ExtractPlugin from 'extract-text-webpack-plugin';
//import ManifestPlugin from 'manifest-revision-webpack-plugin';

const CWD = process.cwd();
const PORT = process.env.PORT || 9001;

export default function ({dev, hot, test}) {

	const JS_NAME = '[name].js';
	const DEVTOOL = dev || test ? 'inline-source-map' : null;

	const cfg = {
		watch: dev,
		cache: dev,
		debug: dev,
		context: CWD + '/src',
		entry: {
			app: ['./app/app'],
			vendor: ['./vendor/vendor']
		},
		output: {
			path: CWD + '/dist',
			filename: JS_NAME,
			publicPath: '/'
		},
		devtool: DEVTOOL,
		resolve: {
			modulesDirectories: ['node_modules'],
			extensions: ['', '.js', '.json'],
			alias: {
				assets: CWD + 'src/assets'
			}
		},
		module: {
			preLoaders: [{
				test: /\.js$/,
				include: CWD + '/src',
				loader: 'eslint!jscs'
			}, {
				test: /\.styl$/,
				include: CWD + '/src',
				loader: 'stylint'
			}],
			loaders: [{
				test: /\.js$/,
				include: CWD + '/src',
				loader: 'babel'
			}, {
				test: /\.css$/,
				include: CWD + '/src',
				loader: 'style!css'
			}, {
				test: /\.html$/,
				include: CWD + '/src',
				loader: 'html'
			}, {
				test: /\.jade$/,
				include: CWD + '/src/pages',
				loader: 'jade?pretty=true'
			}, {
				test: /\.jade$/,
				include: CWD + '/src/app',
				loader: 'raw!jade-html'
			}, {
				test: /\.styl$/,
				include: CWD + '/src',
				loader: 'style!css!stylus'
			}]
		},
		plugins: [
			new HtmlPlugin({
				filename: 'index.html',
				template: 'pages/index.jade'
			})
		]
	};

	if (hot) {
		cfg.entry.app.unshift(`webpack-dev-server/client?http://localhost:${PORT}/`);
		cfg.devServer = {
			hot: true,
			stats: {
				colors: true
			}
		};
	}

	if (!dev) {
		cfg.plugins.push(
			new webpack.optimize.UglifyJsPlugin({

			})
		);
	}

	return cfg;

}
