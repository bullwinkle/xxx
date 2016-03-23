import _ from 'lodash';
import del from 'del';
import webpack from 'webpack';
import HotServer from 'webpack-dev-server';
import protractor from 'protractor/lib/launcher';
import browsersync from 'browser-sync';
import spa from 'browser-sync-spa';
import {log} from 'gulp-util';
import {task, parallel, series} from 'gulp';
import {Server as KarmaServer} from 'karma';

// Main utils configuration
import wpSetup from './webpack';
import bsSetup from './browsersync';
import protSetup from './protractor';
import karmaSetup from './karma';

// Main constants
const SPA = true;
const DEV = process.env.NODE_ENV !== 'production';
//const BUILD_PROXY = process.env.BUILD_PROXY || 'http://mamka.localhost';
const BUILD_PROXY = '';
const BUILD_PORT = process.env.BUILD_PORT || 9001;
const KARMA_PORT = process.env.KARMA_PORT || 9002;
const WD_HUB_URL = process.env.WD_HUB_URL || 'http://localhost:4444/wd/hub';
const WD_HUB_BASE = process.env.WD_HUB_BASE || `http://localhost:${BUILD_PORT}`;

// Static server for assets
const bsServer = browsersync.create();

// Clean all generated sources
task('clean', () => del('dist'));

// Build webpack with hot server
task('hot', () => {
	const compiler = webpack(wpSetup({
		port: BUILD_PORT,
		dev: true,
		hot: true
	}));
	const server = new HotServer(compiler, {
		hot: true,
		inline: true,
		stats: {colors: true},
		historyApiFallback: true
	});
	server.listen(BUILD_PORT);
});

// Build webpack dev/prod static assets
task('build', done => {
	if (DEV) done = _.once(done);
	const config = wpSetup({
		dev: DEV,
		hot: false
	});
	webpack(config, (err, stats) => {
		if (err) console.error(err);
		log('[webpack]', stats.toString({colors: true}));
		done();
	});
});

// Start browsersync server with assets
task('serve', done => {
	const config = bsSetup({
		dev: DEV,
		port: BUILD_PORT,
		proxy: BUILD_PROXY
	});
	if (SPA && !BUILD_PROXY) {
		bsServer.use(spa({
			selector: '[ng-app]'
		}));
	}
	bsServer.emitter.on('exit', () => done());
	bsServer.init(config);
});

// Run karma unit tests
task('test:unit', done => {
	const config = karmaSetup({
		dev: DEV,
		real: false,
		port: KARMA_PORT
	});
	const server = new KarmaServer(config, (code) => {
		if (!DEV) done();
		log('[karma]', 'exited with ' + code);
		process.exit(code);
	});
	server.start();
});

// Run protractor e2e tests
task('test:e2e', done => {
	const config = protSetup({
		url: WD_HUB_URL,
		base: WD_HUB_BASE
	});
	protractor.init('', config);
	bsServer.exit();
	bsServer.emitter.emit('exit');
	done();
});

// Default task for start development
task('default', series(
	'clean',
	parallel('build', 'serve')
));
