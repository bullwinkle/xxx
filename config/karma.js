import wpSetup from './webpack';

const wpConfig = wpSetup({
	dev: false,
	test: true
});

export default function ({dev, real}) {

	let cfg = {
		autoWatch: dev,
		singleRun: !dev,
		frameworks: ['chai', 'jasmine'],
		reporters: ['mocha'],
		browsers: ['PhantomJS'],
		files: [
			'src/**/*.spec.js'
		],
		preprocessors: {
			'src/**/*.spec.js': ['webpack', 'sourcemap']
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
			colors: true,
			noInfo: false
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