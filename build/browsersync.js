const PORT = process.env.PORT || 9001;

export default function ({dev}) {

	const baseDir = 'dist';

	let cfg = {
		server: {baseDir},
		files: dev ? `${baseDir}/**/*.*` : null,
		port: PORT,
		open: false,
		notify: false
	};

	return cfg;
}