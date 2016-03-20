module.exports = function (page) {
	"ngInject";

	var vm = this;
	vm.page = page;
	window.vm = vm;
	return vm;
}