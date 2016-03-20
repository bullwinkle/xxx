module.exports = function($location, $state, categories, categorySlug, Posts) {
	"ngInject";
	// TODO add current_page param to url, to make this indaxable

	var currentPage = 0

	var vm = this;
	vm.posts = []
	vm.perPage = 10;
	vm.isLoading = false;
	vm.allLoaded = false;
	vm.loadMore = () => {
		if (vm.allLoaded) return;
		vm.isLoading = Posts.query({
			"filter[category_name]": categorySlug,
			page: ++currentPage,
			per_page: vm.perPage
		})
		vm.isLoading.$promise.then((res) => {

			// TODO save somewhere and somehow loaded collection to render it all at once, when going back to this view

			_.each(res, post => vm.posts.push(post));
			if (res.length < vm.perPage) vm.allLoaded = true;
		})

	}
	vm.getThumbnailUrl = (str) => {
		if (!str) return null;
		return `url(${str})`
	}
	vm.loadMore();
	return vm;
};
