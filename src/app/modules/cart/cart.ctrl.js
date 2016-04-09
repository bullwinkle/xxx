module.exports = function ($timeout, cart, Mail) {
	"ngInject";
	var vm = this;
	vm.order = {
		name: "",
		phone: "",
		email: "",
		comment: "",
		products: cart.goods
	}
	vm.getThumbnailUrl = (str) => {
		if (!str) return null;
		return `url(${str})`
	}
	vm.remove = (product, $event) => {
		$event.preventDefault()
		$event.stopPropagation()
		vm.order.products.remove(product);
	}
	vm.getTotalPrice = () => {
		return _.chain(vm.order.products)
			.reduce((total, product) => {
				return total + +product.acf.price
			}, 0)
			.value()
	}
	vm.reset = () => {
		cart.goods.reset()
		vm.order = {
			name: "",
			phone: "",
			email: "",
			comment: "",
			products: cart.goods
		}
		if (vm.orderForm) {
			vm.orderForm.$setPristine()
			vm.orderForm.$setUntouched()
		}
	}
	vm.placeOrder = (form, e) => {
		e.preventDefault()
		var mail = {
			subject: `Заказ${vm.order.name? ` на имя: ${vm.order.name}`: ''}`,
			content: vm.order,
			templateType: 'order'
		}
		Mail.save(mail).$promise
			.then((res) => {
				$timeout(vm.reset, 2000)
			})
			.catch((err)=> {
				console.warn(err)
			})

	}
}
