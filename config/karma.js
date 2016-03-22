import wpSetup from './webpack';

export default function ({dev, port, real}) {

	const defaults = wpSetup({
		dev: true,
		test: true
	});

	const wpConfig = Object.assign(defaults, {
		entry: {},
		output: {}
	});

	let cfg = {
		port,
		autoWatch: dev,
		singleRun: !dev,
		frameworks: ['chai', 'jasmine'],
		reporters: ['mocha'],
		browsers: ['PhantomJS'],
		files: [
			// Compiled vendors from webpack config
			'dist/vendor*.{js,css}',
			'dist/app*.{js,css}',
			// Required for testing
			'node_modules/angular-mocks/angular-mocks.js',
			// Test files
			'test/unit/index.js',
			'test/unit/**/*.js',
			'src/**/*.{unit,spec}.js'
		],
		preprocessors: {
			'src/**/*': ['webpack', 'sourcemap'],
			'test/**/*': ['webpack', 'sourcemap']
		},
		plugins: [
			'karma-chai',
			'karma-mocha',
			'karma-webpack',
			'karma-jasmine',
			'karma-mocha-reporter',
			'karma-sourcemap-loader',
			'karma-phantomjs-launcher'
		],
		webpack: wpConfig,
		webpackMiddleware: {
			noInfo: true
		}
	};

	if (real) {
		cfg.browsers = [
			'Chrome',
			'Safari',
			'Firefox'
		];
		cfg.plugins.push('karma-safari-launcher');
		cfg.plugins.push('karma-chrome-launcher');
		cfg.plugins.push('karma-firefox-launcher');
	}

	return cfg;

}
