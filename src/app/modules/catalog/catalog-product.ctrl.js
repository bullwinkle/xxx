module.exports = function($location, $state, $timeout, product, categories, tags, _initFullGallery, cart) {
	"ngInject";

	var vm = this;
	vm.product = product;
	vm.inCartBool = cart.goods.contains(product)
	vm.inCart = () => {
		vm.inCartBool = cart.goods.contains(product)
		return vm.inCartBool
	}
	vm.updateInCart = () => {
		if (vm.inCartBool) {
			cart.goods.remove(product)
		} else {
			cart.goods.push(product)
		}
	}
	vm.product.$promise.then(() => {
		vm.product.categoriesLinks = _.mapEntityByIds(vm.product.categories, categories);
		vm.product.tagsLinks = _.mapEntityByIds(vm.product.tags, tags);
		$timeout( () => {
			_initFullGallery()
		})
	})
	//vm.gallery = ["/assets/img/kawasaki_ninja.jpg","/assets/img/examples/1.jpg","/assets/img/examples/2.jpg", "/assets/img/examples/3.jpg",    "/assets/img/examples/4.jpg",    "/assets/img/examples/5.jpg", "/assets/img/examples/6.jpg"]
	return vm;
};
