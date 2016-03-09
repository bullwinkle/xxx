import wpSetup from './webpack';

const defaults = wpSetup({
	dev: true,
	test: true
});

const wpConfig = Object.assign(defaults, {
	entry: {},
	output: {}
});

export default function ({dev, real}) {

	let cfg = {
		autoWatch: dev,
		singleRun: !dev,
		frameworks: ['chai', 'jasmine'],
		reporters: ['mocha'],
		browsers: ['PhantomJS'],
		files: [
			'./dist/vendor.js',
			'./node_modules/angular-mocks/angular-mocks.js',
			'./dist/app.js',
			'./src/**/*.spec.js',
			'./src/**/*.unit.js',
			'./test/unit/**/*.js'
		],
		preprocessors: {
			'./src/**/*.spec.js': ['webpack', 'sourcemap'],
			'./src/**/*.unit.js': ['webpack', 'sourcemap'],
			'./test/unit/**/*.js': ['webpack', 'sourcemap']
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