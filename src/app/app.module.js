import './app.styles.styl';
// common functions
_.extend(_, require('./functions'))

angular.module('app', [
	'vendor',
	require('./core/core.module').name,
	require('./ui/ui.module').name,
	require('./modules/cart/cart.module').name,
	require('./modules/catalog/catalog.module').name,
	require('./modules/categories/categories.module').name
	//require('./modules/articles/articles.module').name,
	//require('./modules/catalog/catalog.module').name
])
.config(require('./app.config'))
.config(require('./app.router'))
.controller('app.ctrl', require('./app.ctrl'))
.constant('app.settings', require('./app.settings'))
.service('url', () => require('url'))
.run(require('./app.run'));