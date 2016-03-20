module.exports = function ($location, $state, post, categories, tags, $timeout, _initRowGallery) {
	"ngInject";

	var vm = this;
	vm.post = post;
	vm.post.$promise.then(() => {
		vm.post.categoriesLinks = _.mapEntityByIds(vm.post.categories, categories);
		vm.post.tagsLinks = _.mapEntityByIds(vm.post.tags, tags);
		$timeout(_initRowGallery,100)
	})
	return vm;
};
