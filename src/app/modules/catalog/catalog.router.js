var path = require('path');

module.exports = function ($stateProvider, $urlRouterProvider) {
	"ngInject";

	$stateProvider
		.state('catalog', {
			parent: 'app.categories.all',
			url: '^/category/catalog',
			abstract: true,
			views: {
				'content@': {
					controller: require("app/modules/catalog/catalog.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/catalog/catalog.tpl.jade")
				}
			},
			resolve: {
				categories: (Categories, $stateParams) => {
					return Categories.query();
				}
			},
			data: {
				proxyName: 'catalog.all'
				//displayName: 'Каталог'
			},
			onEnter: ($state,$stateParams) => {}
		})
		.state('catalog.all', {
			url: '{path:[^\/?]*}', // enable state wheather '/' or not
			views: {
				'productList': {
					controller: require("app/modules/catalog/productList.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/catalog/productList.tpl.jade")
				}
			},
			resolve: {
				posts: (Posts, $stateParams) => {
					return Posts.query({"filter[category_name]": 'catalog'});
				}
			},
			data: {
				displayName: 'Каталог'
				//urlPrefix: '/category/catalog/',
				//displayName: "{{$stateParams.categoryPath}}",
				//displayPathname: {
				//	pathName: '{{$stateParams.categoryPath}}',
				//	fragment: 'slug',
				//	type: 'post'
				//}
			},
			onEnter: ($state,$stateParams) => {}
		})
		.state('catalog.category', {
			url: '/*categoryPath',
			views: {
				'productList': {
					controller: require("app/modules/catalog/productList.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/catalog/productList.tpl.jade")
				}
			},
			data: {
				urlPrefix: '/category/catalog/',
				displayName: "{{$stateParams.categoryPath}}",
				displayPathname: {
					pathName: '{{$stateParams.categoryPath}}',
					fragment: 'slug',
					type: 'post'
				}
			},
			resolve: {
				posts: (Posts, $stateParams) => {
					var path = $stateParams.categoryPath;
					var pathArr = path.split('/')
					var id = pathArr.pop()
					return Posts.query({"filter[category_name]": id});
				}
			},
			onEnter: ($state,$stateParams) => {}
		}).state('catalog.post', {
			url: '^/post/catalog/*categoryPath/{postId:int}',
			views: {
				'content@': {
					controller: require("app/modules/catalog/catalog-product.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/catalog/catalog-product.tpl.jade")
				}
			},
			data: {
				urlPrefix: '/category/catalog/',
				displayPathname: {
					pathName: '{{$stateParams.categoryPath}}/{{$stateParams.postId}}',
					fragment: 'slug',
					type: 'post'
				}
			},
			resolve: {
				product: (Posts, $stateParams) => {
					var path = $stateParams.categoryPath;
					var id = $stateParams.postId;
					return Posts.get({id: id})
				}
			},
			onEnter: ($state,$stateParams) => {}
		});
}