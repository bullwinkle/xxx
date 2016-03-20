var logEvents = false;
var log = function () { return !logEvents ? undefined : console.log.apply(console, arguments); };
var warn = function () { return !logEvents ? undefined : console.warn.apply(console, arguments); };
var info = function () { return !logEvents ? undefined : console.info.apply(console, arguments); };

module.exports = function ($state, $stateParams, $location, $urlRouter, $rootScope, $templateCache, $q, $cacheFactory, $localStorage,$sessionStorage) {
	"ngInject";

	window.ngApp = {$state, $stateParams, $location, $urlRouter, $rootScope, $templateCache, $q, $cacheFactory,$localStorage,$sessionStorage};

	console.info('RUN!', $rootScope);

	$rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
		$rootScope.isLoading = true;
		warn('$stateChangeStart', {event, toState, toParams, fromState, fromParams});
	});

	$rootScope.$on("$stateChangeSuccess", _.debounce((event, next, current)=> {
		$rootScope.isLoading = false;
		if (next.name !== 'app.search') $rootScope.globalSearchQuery = '';
		warn('$stateChangeSuccess', {event, next, current});
	}, 10));

	$rootScope.$on("$stateChangeError", (event, toState, toParams, fromState, fromParams, error) => {
		$rootScope.isLoading = false;
		warn("$stateChangeError", {event, toState, toParams, fromState, fromParams, error})
	});

	$rootScope.$on("$viewContentLoading", (event, unfoundState, fromState, fromParams) => {
		$rootScope.isLoading = true;
		warn("$viewContentLoading", {event, unfoundState, fromState, fromParams})
	});

	$rootScope.$on("$viewContentLoaded", (event, unfoundState, fromState, fromParams) => {
		$rootScope.isLoading = false;
		warn("$viewContentLoaded", {event, unfoundState, fromState, fromParams})
	});

	$rootScope.$on("$stateNotFound", (event, unfoundState, fromState, fromParams) => {
		$rootScope.isLoading = false;
		warn("$stateNotFound", {event, unfoundState, fromState, fromParams})
		$state.go('app.notFound');
	});

};
