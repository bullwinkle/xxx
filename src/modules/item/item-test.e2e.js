'use strict';

class Page {

	constructor () {
		this.nameInput = element(by.model('vm.data.name'));
		this.textInput = element(by.model('vm.data.text'));
		this.createBtn = element(by.id('create'));
		return this;
	}

	fillForm (name, text) {
		this.nameInput.sendKeys(name || '');
		this.textInput.sendKeys(text || '');
		return this;
	}

	submitForm () {
		this.createBtn.click();
		return this;
	}

	confirmDelete () {
		return element(by.css('md-dialog-actions button:last-child')).click()
	}

	getTitle (index) {
		return element(by.css(`md-card:nth-child(${index}) .md-headline`))
	}

}

describe('Smoke item test', () => {

	let page;

	beforeEach(() => {
		browser.get('/items');
		page = new Page();
	});

	it('must create new items',  () => {
		page.fillForm('Name-1', 'Text-1');
		page.submitForm();
		page.fillForm('Name-2', 'Text-2');
		page.submitForm();
		page.fillForm('Name-3', 'Text-3');
		page.submitForm();
		expect(page.getTitle(1).getText()).toEqual('Name-1');
		expect(page.getTitle(2).getText()).toEqual('Name-2');
		expect(page.getTitle(3).getText()).toEqual('Name-3');
	});

	it('must remove new items',  () => {
		element(by.id('delete-1')).click();
		page.confirmDelete();
		element(by.id('delete-1')).click();
		page.confirmDelete();
		element(by.id('delete-1')).click();
		page.confirmDelete();
	});

});
