module.exports = function ($rootScope, $timeout) {
	"ngInject";

	var result = {
		currentHref: window.location.pathname
	};

	$rootScope.$on("$stateChangeSuccess", (event, next, current) => {
		$timeout(() => {
			result.currentHref = window.location.pathname;
		},10)
	})

	return result;
}