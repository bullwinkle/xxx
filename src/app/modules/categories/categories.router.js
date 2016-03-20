var path = require('path');

module.exports = function ($stateProvider, $urlRouterProvider) {
	"ngInject";


	$stateProvider
		.state('app.categories', {
			url: '/category',
			abstract: true,
			views: {
				'content@': {
					controller: require("app/modules/categories/categoryPostsList.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/categories/categoryPostsList.tpl.jade")
				}
			},
			resolve: {
				//categories: (Categories, $stateParams) => {
				//	return Categories.query();
				//}
			},
			data: {
				//proxyName: 'app.category.posts'
				//displayName: '__category__'
			}

		}).state('app.categories.all', {
			url: '/',
			views: {
				'content@': {
					controller: require("app/modules/categories/categoriesList.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/categories/categoriesList.tpl.jade")
				}
			},
			data: {
				displayName: 'Категории'
			},
			resolve: {
				categories: (Categories) => {
					return Categories.query();
				}
				//posts: (Posts,categorySlug,$stateParams) => {
				//	console.warn('categorySlug',categorySlug)
				//	var path = $stateParams.categoryPath;
				//	var pathArr = path.split('/')
				//	var id = pathArr.pop()
				//	return Posts.query({"filter[category_name]": categorySlug});
				//}
			},
			onEnter: ($state, $location, $stateParams) => {
			}
		}).state('app.categories.all.category', {
			url: '*categoryPath',
			views: {
				'content@': {
					controller: require("app/modules/categories/categoryPostsList.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/categories/categoryPostsList.tpl.jade")
				}
			},
			data: {
				displayName: "{{$stateParams.categoryPath}}",
				displayPathname: {
					pathName: '{{$stateParams.categoryPath}}',
					fragment: 'slug',
					type: 'post'
				}
			},
			resolve: {
				categorySlug: ($stateParams) => {
					var path = $stateParams.categoryPath;
					var pathArr = path.split('/')
					var slug = pathArr.pop()
					return slug;
				}
				//posts: (Posts,categorySlug,$stateParams) => {
				//	console.warn('categorySlug',categorySlug)
				//	var path = $stateParams.categoryPath;
				//	var pathArr = path.split('/')
				//	var id = pathArr.pop()
				//	return Posts.query({"filter[category_name]": categorySlug});
				//}
			},
			onEnter: ($state, $location, $stateParams) => {
			}

		}).state('app.categories.all.post', {
			url: '^/post/*categoryPath/{postId:int}',
			views: {
				'content@': {
					controller: require("app/modules/post/post.ctrl"),
					controllerAs: 'vm',
					template: require("app/modules/post/post.tpl.jade")
				}
			},
			data: {
				//displayName: '{{$stateParams.postId}}',
				urlPrefix: '/category/',
				displayPathname: {
					pathName: '{{$stateParams.categoryPath}}/{{$stateParams.postId}}',
					fragment: 'slug',
					type: 'post'
				}
			},
			resolve: {
				post: (Posts, $stateParams) => {
					var categoryPath = $stateParams.categoryPath;
					var postId = $stateParams.postId;
					return Posts.get({id: postId})
				}
			},
			onEnter: ($state, $location, $stateParams) => {
			}
		});
}