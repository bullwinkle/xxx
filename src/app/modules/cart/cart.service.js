module.exports = function ($localStorage) {
	"ngInject";
	$localStorage.goods || ($localStorage.goods = [])
	let goods = $localStorage.goods
	let push = Array.prototype.push
	goods.contains = (productToCheck) => {
		return !!_.find(goods, product => product.id == productToCheck.id);
	}
	goods.push = (productToPush) => {
		// TODO make increment of ordered count, if product found in cart
		let alreadyInCart = goods.contains(productToPush)
		if (alreadyInCart) return false
		return push.apply(goods,[productToPush])
	}
	goods.remove = (productToRemove) => {
		return _.remove(goods, product => product.id == productToRemove.id);
	}
	goods.reset = () => {
		return goods.splice(0,goods.length)
	}

	return {
		goods: goods
	}
}
