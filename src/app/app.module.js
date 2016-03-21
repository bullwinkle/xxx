import './app.module.styl';
import 'modules/item/item.module';

angular
	.module('app', ['vendor', 'item'])
	.config(configureRouter);

// @ngInject
function configureRouter ($locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/items');
	$locationProvider.html5Mode({
		requireBase: true,
		enabled: true
	});
}
