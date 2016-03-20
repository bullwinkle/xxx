module.exports = function($location, $state, article) {
	"ngInject";

	var vm = this;
	vm.article = article
	return vm;
};
