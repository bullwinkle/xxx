export default function ({url, base}) {

	let cfg = {
		debug: false,
		seleniumAddress: url,
		specs: [
			process.cwd() + '/test/e2e/index.js',
			process.cwd() + '/test/e2e/**/*.js',
			process.cwd() + '/src/**/*.e2e.js'
		],
		framework: 'jasmine'
	};

	cfg.baseUrl = base;
	cfg.maxSessions = 1;

	cfg.multiCapabilities = [{
		browserName: 'firefox',
		shardTestFiles: true
	}, {
		browserName: 'chrome',
		shardTestFiles: true
	}];

	return cfg;

}
