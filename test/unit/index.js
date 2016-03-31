describe('Cart service test', () => {
	let Cart;
	beforeEach( () => angular.mock.module('app') );
	beforeEach(angular.mock.inject((_cart_) => {
		Cart = _cart_;
	}));

	it('must have angular', () => {
		expect(angular).to.be.an('object');
	});


	it('cart.goods must have expected api', () => {
		expect(Cart.goods).to.be.an('array');
		expect(Cart).to.contain.all.keys(['goods']);

		let expectedCartServiceMethods = [
			"push",
			"contains",
			"remove",
			"reset"
		];
		expectedCartServiceMethods.forEach((method)=> {
			expect(Cart.goods).respondTo(method, `Cart.goods should contain method '${method}'`);
		});
	});
});
