import Calc from './calc.js';
const calc = new Calc();

describe('fake test', () => {

	it('must be an object', () => {
		expect(calc).to.be.an('object');
	});

	it('must have add method', () => {
		expect(calc.add).to.be.an('function');
	});

	it('must correctly sum', () => {
		expect(calc.add(1, 2)).to.equal(3);
		expect(calc.add(0, 0)).to.equal(0);
	});

	it('must sucks', () => {
		expect(calc.add(0, 0)).not.to.equal(2);
	});

});