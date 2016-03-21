'use strict';

describe('Smoke e2e test', () => {

	it('must have a title', () => {
		browser.get('/');
		expect(browser.getTitle()).toEqual(jasmine.any(String));
	});

});
