module.exports = function ($location, $urlRouter, $state, posts, categories, $timeout, cart) {
	"ngInject";

	var vm = this;
	vm.posts = posts;
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
		data = _.find(data, (category) => category.name === 'catalog' )
		var groupedByParents = _.groupBy(data, 'parent');
		var catsById = _.keyBy(data, 'id');
		_.each(_.omit(groupedByParents, "0"), function (children, parentId) {
			catsById[parentId].children = children;
		});
		return groupedByParents['0'];
	}

	vm.inCart = (product) => {
		return cart.goods.contains(product)
	}
	vm.updateInCart = (product, $event) => {
		$event.preventDefault()
		$event.stopPropagation()
		if (vm.inCart(product)) {
			cart.goods.remove(product)
		} else {
			cart.goods.push(product)
		}
	}

	return vm;
};
