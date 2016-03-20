// root scope controller
module.exports = function($rootScope, $location, $state, $timeout) {
	"ngInject";

	var ninja = $rootScope;
	ninja.globalSearchQuery = ninja.globalSearchQuery || (ninja.globalSearchQuery = "");
	ninja.submitGlobalSearch = (searchQuery) => {
		$state.go(`app.search`, {s:searchQuery})
	}
	return ninja;
};