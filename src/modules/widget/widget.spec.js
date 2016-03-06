import Widget from './widget';

describe('widget ui suite', () => {

	const wgt = new Widget(document.body);
	const $h1 = wgt.el.querySelectorAll('h1')[0];

	it('must have a title', () => {
		expect($h1.innerText).to.be.a('string');
	});

	it('must have a default title', () => {
		expect($h1.innerText).to.equal('Hello');
	});

});