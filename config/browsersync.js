export default function ({dev, port, proxy}) {

	const baseDir = 'dist';

	let cfg = {
		port,
		proxy,
		open: false,
		notify: false
	};

	if (dev) {
		cfg.files = `${baseDir}/**/*.*`;
	}

	if (!proxy) {
		cfg.server = {baseDir};
	}

	return cfg;

}
