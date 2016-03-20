module.exports = function ($location, $urlRouter, $state, categories, $timeout, cart) {
	"ngInject";

	var vm = this;
	//vm.posts = posts;
	vm.categories = categories;
	vm.categoryToGoOn = null;
	vm.goods = cart.goods;

	vm.goToUrl = function ()  {
		// a small shit
		var origin = location.protocol + "//" + location.host;
		$location.path( vm.categoryToGoOn.link.replace(origin, "") )
		$urlRouter.sync()
	}

	vm.getThumbnailUrl = (str) => {
		if (!str) return null;
		return `url(${str})`
	}

	vm.makeCategoriesTree = (data) => {
		var groupedByParents = _.groupBy(data, 'parent');
		var catsById = _.keyBy(data, 'id');
		_.each(_.omit(groupedByParents, "0"), function (children, parentId) {
			catsById[parentId].children = children;
		});
		return groupedByParents['0'];
	}

	vm.addToCart = (product) => {
		//delete product.content ?
		cart.goods.push(product)
	}

	return vm;
};
