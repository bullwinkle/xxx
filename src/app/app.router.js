var path = require('path');

module.exports = function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
	"ngInject";
	// make trailing slash optional
	//$urlMatcherFactoryProvider.strictMode(false)

	$urlRouterProvider.when('/', '/category/news')

	$stateProvider.state('app', {
		abstract: true,
		controller: 'app.ctrl',
		controllerAs: 'ninja',
		views: {
			'header@': {
				controller: require("./layout/header.ctrl"),
				controllerAs: 'header'
			},
			'content@': {
				controller: 'app.ctrl',
				controllerAs: 'vm',
				template: require("app/modules/ninja/home.tpl.jade")
			},
			'footer@': {
				controller: require("./layout/footer.ctrl"),
				controllerAs: 'footer'
			}
		},
		data: {
			proxyName: 'app.home'
		},
		resolve: {
			mainMenu: (Menus, $stateParams) => {
				return Menus.get({id: 'primary'});
			},
			categories: (Categories, $stateParams) => {
				return Categories.query();
			},
			tags: (Tags, $stateParams) => {
				return Tags.query();
			},
			globalSearchQuery: ($q, $location) => {
				var defer = $q.defer()
				defer.resolve($location.search().s || '')
				return defer.promise
			}
		},
		onEnter: ($rootScope, mainMenu, categories, tags, globalSearchQuery) => {
			$rootScope.mainMenu = mainMenu;
			$rootScope.categories = categories;
			$rootScope.tags = tags;
			$rootScope.globalSearchQuery = globalSearchQuery;
		}
	}).state('app.home', {
		url: '/',
		data: {
			//displayName: 'home'
		},
		onEnter: ($state, $location, $urlRouter) => {
			//$location.path('/category/news/')
			//$urlRouter.sync()
		}
	}).state('app.search', {
		url: '/search?s',
		views: {
			'content@': {
				controller: require("app/modules/search/search.ctrl"),
				controllerAs: 'vm',
				template: require("app/modules/search/search.tpl.jade")
			}
		},
		data: {
			displayName: 'Результаты поиска'
		},
		resolve: {
			searchQuery: ($stateParams) => {
				return $stateParams.s
			},
			searchResult: ($stateParams, Posts) => {
				return Posts.query({search: $stateParams.s});
			},

		},
		onEnter: function ($state, $location, $stateParams) {
			console.warn('search page')
		}

		/* POST */

		//}).state('app.post', {
		//	url: '/post',
		//	abstract: true,
		//	//views: {
		//	//	'content@': {
		//	//		controller: require("app/modules/post/post.ctrl"),
		//	//		controllerAs: 'vm',
		//	//		template: require("app/modules/post/post.tpl.jade")
		//	//	}
		//	//},
		//	data: {
		//		proxyName: 'app.post.other'
		//	}


		/* POST.PRODUCT */

		//}).state('app.post.product', {
		//	url: '/catalog/*postPath',
		//	views: {
		//		'content@': {
		//			controller: require("app/modules/catalog/catalog-product.ctrl"),
		//			controllerAs: 'vm',
		//			template: require("app/modules/catalog/catalog-product.tpl.jade")
		//		}
		//	},
		//	data: {
		//		//displayName: '{{$stateParams.postPath}}'
		//	},
		//	resolve: {
		//		productId: ($stateParams) => {
		//			var path = $stateParams.postPath;
		//			var pathArr = path.split('/')
		//			var id = +pathArr.pop()
		//			return id;
		//		},
		//		product: (Posts, $stateParams) => {
		//			var path = $stateParams.postPath;
		//			var pathArr = path.split('/')
		//			var id = +pathArr.pop()
		//			return Posts.get({id: id})
		//		}
		//	},
		//	onEnter: ($state, $location, $stateParams) => {
		//	}
		//
		//	/* POST.OTHER */
		//
		//}).state('app.post.other', {
		//	url: '/*postPath',
		//	views: {
		//		'content@': {
		//			controller: require("app/modules/post/post.ctrl"),
		//			controllerAs: 'vm',
		//			template: require("app/modules/post/post.tpl.jade")
		//		}
		//	},
		//	data: {
		//		//displayName: '{{$stateParams.postPath}}'
		//	},
		//	resolve: {
		//		postId: ($stateParams) => {
		//			var path = $stateParams.postPath;
		//			var pathArr = path.split('/')
		//			var id = +pathArr.pop()
		//			return id;
		//		},
		//		post: (Posts, $stateParams) => {
		//			var path = $stateParams.postPath;
		//			var pathArr = path.split('/')
		//			var id = +pathArr.pop()
		//			return Posts.get({id: id})
		//		}
		//	},
		//	onEnter: ($state, $location, $stateParams) => {
		//	}

		//}).state('app.motoparts', {
		//	url: '/category/catalog/motoparts', views: {
		//		'content@': {
		//			controller: require("app/modules/catalog/catalog.ctrl"),
		//			controllerAs: 'vm',
		//			template: require("app/modules/catalog/catalog.tpl.jade")
		//		}
		//	}, data: {
		//		displayName: 'motoparts'
		//	}, resolve: {
		//		categories: (Categories, $stateParams) => {
		//			return Categories.query();
		//		}, products: (motoPartsFactory, $stateParams) => {
		//			return motoPartsFactory.query();
		//		}
		//	}, onEnter: ($state, $location) => {
		//	}
		//}).state('app.motoparts.motopart', {
		//		url: '/:id', views: {
		//			'content@': {
		//				controller: require("app/modules/catalog/catalog-product.ctrl"),
		//				controllerAs: 'vm',
		//				template: require("app/modules/catalog/catalog-product.tpl.jade")
		//			}
		//		}, data: {
		//			displayName: 'motopart'
		//		}, resolve: {
		//			product: (motoPartsFactory, $stateParams) => {
		//				return motoPartsFactory.get({id: $stateParams.id})
		//			}
		//		}, onEnter: ($state, $location) => {
		//		}
		//
		//	}).state('app.motorcycles', {
		//		url: '/category/catalog/motorcycles', views: {
		//			'content@': {
		//				controller: require("app/modules/catalog/catalog.ctrl"),
		//				controllerAs: 'vm',
		//				template: require("app/modules/catalog/catalog.tpl.jade")
		//			}
		//		}, data: {
		//			displayName: 'motorcycles'
		//		}, resolve: {
		//			categories: (Categories, $stateParams) => {
		//				return Categories.query();
		//			}, products: (motorcyclesFactory, $stateParams) => {
		//				return motorcyclesFactory.query();
		//			}
		//		}, onEnter: ($state, $location) => {
		//		}
		//	}).state('app.motorcycles.motorcycle', {
		//		url: '/:id', views: {
		//			'content@': {
		//				controller: require("app/modules/catalog/catalog-product.ctrl"),
		//				controllerAs: 'vm',
		//				template: require("app/modules/catalog/catalog-product.tpl.jade")
		//			}
		//		}, data: {
		//			displayName: 'motorcycle'
		//		}, resolve: {
		//			product: (motorcyclesFactory, $stateParams) => {
		//				return motorcyclesFactory.get({id: $stateParams.id});
		//			}
		//		}, onEnter: ($state, $location) => {
		//		}
		//
		//
		//	}).state('app.about', {
		//		url: '/about', views: {
		//			'content@': {
		//				controller: require("app/core/page.ctrl"),
		//				controllerAs: 'vm',
		//				template: require("app/modules/ninja/about.tpl.jade")
		//			}
		//		}, data: {
		//			displayName: 'about'
		//		}, resolve: {
		//			page: (Pages, $stateParams) => {
		//				return Pages.getBySlug({slug: 'about'})
		//			}
		//		}, onEnter: ($state, $location) => {
		//		}
		//
		//	}).state('app.service', {
		//		url: '/service', views: {
		//			'content@': {
		//				controller: require("app/core/page.ctrl"),
		//				controllerAs: 'vm',
		//				template: require("app/modules/buiseness-services/motoservice.tpl.jade")
		//			}
		//		}, data: {
		//			displayName: 'service'
		//		}, resolve: {
		//			page: (Pages, $stateParams) => {
		//				return Pages.getBySlug({slug: 'service'})
		//			}
		//		}, onEnter: ($state, $location) => {
		//		}
		//
		//	})
	// TODO enable this route and make it customizable
	//}).state('app.contacts', {
	//	url: '/contacts', views: {
	//		'content@': {
	//			controller: require("./app.ctrl"),
	//			controllerAs: 'vm',
	//			template: require("app/modules/ninja/contacts.tpl.jade")
	//		}
	//	}, data: {
	//		displayName: 'contacts'
	//	}, resolve: {
	//		page: (Pages, $stateParams) => {
	//			return Pages.query({slug: 'contacts'});
	//		}
	//	}, onEnter: ($state, $location) => {
	//	}
	}).state('pallete', {
		url: '/pallete',
		views: {
			'header': {
				template: ''
			},
			'content': {
				controller: require("./app.ctrl"),
				controllerAs: 'vm',
				template: require("app/modules/ninja/pallete.tpl.jade")
			},
			'footer': {
				template: ''
			}
		}, data: {
			displayName: 'Пилитра сайта'
		}, onEnter: ($state, $location) => {
			console.warn('pallete')
		}

	}).state('app.page', {
		url: '/*pagePath',
		views: {
			'content@': {
				controller: require("app/core/page.ctrl"),
				controllerAs: 'vm',
				template: require("app/modules/ninja/about.tpl.jade")
			}
		},
		data: {
			// TODO replace with actual page name ( slug or what )
			displayName: "{{$stateParams.pagePath}}",
			displayPathname: {
				pathName: '{{$stateParams.pagePath}}',
				fragment: 'slug',
				type: "page"
			}
		},
		resolve: {
			page: (Pages, $stateParams, $state) => {
				var path = $stateParams.pagePath;
				var pathArr = path.split('/')
				var pageSlug = pathArr.pop()
				return Pages.getBySlug({slug: pageSlug})
			}
		},
		onEnter: function ($state, $location, $stateParams, page) {
			page.$promise
				.then((page) => {
					if (_.isEmpty(page.toJSON())) $state.go('app.notFound')
				})
				.catch(err => $state.go('app.notFound'));
		}

	}).state('app.notFound', {
		views: {
			'content@': {
				controller: require("./app.ctrl"),
				controllerAs: 'vm',
				template: require("app/core/notFound.tpl.jade")
			}
		},
		data: {
			displayName: 'not-found'
		},
		onEnter: ($state, $location) => {
		}

	});
	$urlRouterProvider.otherwise(($injector, $location) => {
		try {
			$injector.get('$state').go('app.notFound')
		} catch (err) {
			console.err(err);
		}
	});

};