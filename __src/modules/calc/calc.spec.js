describe('test suite', () => {

	let ctrl;

	beforeEach(angular.mock.module('app'));

	beforeEach(angular.mock.inject($injector => {
		ctrl = $injector.get('$controller')('CalcController');
	}));

	it('must have title', () => {
		expect(ctrl.title).to.be.a('string');
	});

	it('must have default title', () => {
		expect(ctrl.title).to.equal('Hello world!');
	});

	it('must can change title', () => {
		ctrl.change();
		expect(ctrl.title).to.equal('Hello mamka!');
	});

	it('must reset title in next tests', () => {
		expect(ctrl.title).to.equal('Hello world!');
	});

});