'use strict';

console.log('Maaamka?');

describe('h1', () => {
	const $el = document.querySelectorAll('h1')[0];
	it('must has content', () => {
		expect($el.innerText).to.equal('Hello');
	});
});

describe('button', () => {
	const $el = document.querySelectorAll('button')[0];
	it('must has content', () => {
		expect($el.innerText).to.equal('Click');
	});
});
