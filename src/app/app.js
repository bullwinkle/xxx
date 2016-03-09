import './app.styl';
import 'modules/calc/calc.module';

angular
	.module('app', ['vendor', 'calc'])
	.config(configureRouter)
	.config(configureStates);

// @ngInject
function configureRouter ($locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$locationProvider.html5Mode({
		requireBase: true,
		enabled: true
	});
}

// @ngInject
function configureStates ($stateProvider) {
	$stateProvider.state('home', {
		url: '/home',
		template: '<h1>Hello</h1>'
	});
}