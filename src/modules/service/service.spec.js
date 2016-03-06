import Service from './service';

describe('service unit suite', () => {

	const srv = new Service();

	it('must have "sum" method', () => {
		expect(srv.sum).to.be.a('function');
	});

	it('must sum 2 numbers', () => {
		expect(srv.sum(1, 2)).to.equal(3);
	});

});