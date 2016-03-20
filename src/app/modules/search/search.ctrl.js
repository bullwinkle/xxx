//module.exports = function($location, $state, searchQuery) {
module.exports = function($location, $state, searchQuery, searchResult) {
	"ngInject";

	var vm = this;
	vm.searchQuery = searchQuery;
	vm.searchResult = searchResult;
	vm.getThumbnailUrl = (str) => {
		if (!str) return null;
		return `url(${str})`
	}
	return vm;
};
