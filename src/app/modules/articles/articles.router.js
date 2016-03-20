var path = require('path');

module.exports = function ($stateProvider, $urlRouterProvider) {
	"ngInject";

	//$stateProvider.state('app.articles', {
	//		url: '/category/articles', views: {
	//			'content@': {
	//				controller: require("app/modules/articles/articles.ctrl"),
	//				controllerAs: 'vm',
	//				template: require("app/modules/articles/articles.tpl.jade")
	//			}
	//		}, data: {
	//			displayName: 'articles'
	//		}, resolve: {
	//			articles: (articlesFactory, $stateParams) => {
	//				return articlesFactory.query()
	//			}
	//		}, onEnter: ($state, $location) => {
	//		}
	//
	//	}).state('app.articles.article', {
	//		url: '/:id', views: {
	//			'content@': {
	//				controller: require("app/modules/articles/article.ctrl"),
	//				controllerAs: 'vm',
	//				template: require("app/modules/articles/article.tpl.jade")
	//			}
	//		}, data: {
	//			displayName: 'article'
	//		}, resolve: {
	//			article: (articlesFactory, $stateParams) => {
	//				return articlesFactory.get({id: $stateParams.id})
	//			}
	//		}, onEnter: ($state, $location) => {
	//		}
	//
	//	});
}