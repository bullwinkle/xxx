import wpSetup from './webpack';

const webpackConfig = wpSetup({dev: false, test: true});

//console.log('=================================');
//console.log(JSON.stringify(webpackConfig, 4, 4));
//console.log('=================================');

export default function () {

	return {

		//coverageReporter: {
		//	dir:'tmp/coverage/',
		//	reporters: [
		//		{ type:'html', subdir: 'report-html' },
		//		{ type:'lcov', subdir: 'report-lcov' }
		//	],
		//	instrumenterOptions: {
		//		istanbul: { noCompact:true }
		//	}
		//},

		files: [
			'src/modules/**/*.spec.js'
		],

		browsers: [
			//'Chrome',
			//'Safari',
			//'Firefox',
			'PhantomJS'
		],

		frameworks: ['chai', 'jasmine'],

		//reporters: ['mocha', 'coverage'],
		reporters: ['mocha'],

		preprocessors: {
			'src/modules/**/*.spec.js': ['webpack', 'sourcemap']
		},

		//singleRun: true,
		//autoWatch: false,

		plugins: [
			'karma-chai',
			'karma-mocha',
			'karma-jasmine',
			'karma-webpack',
			//'karma-coverage',
			'karma-mocha-reporter',
			'karma-sourcemap-loader',
			//'karma-safari-launcher',
			//'karma-chrome-launcher',
			//'karma-firefox-launcher',
			'karma-phantomjs-launcher'
		],

		webpack: webpackConfig,

		webpackMiddleware: {
			noInfo: false
		}

	};

}