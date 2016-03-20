var path = require('path');

module.exports = function ($stateProvider, $urlRouterProvider) {
	"ngInject";

	$stateProvider
		.state('app.cart', {
			url: '/cart', views: {
				'content@': {
					controller: 'cart.ctrl',
					controllerAs: 'vm',
					template: require("app/modules/cart/cart.tpl.jade")
				}
			}, data: {
				displayName: 'Корзина'
			}, onEnter: ($state, $location) => {
			}
		});
}