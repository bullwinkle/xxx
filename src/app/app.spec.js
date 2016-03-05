import '../vendor/vendor';
import './app';

describe('ui/e2e suite', () => {

	const $h1 = document.getElementsByTagName('h1')[0];
	const $btn = document.getElementsByTagName('button')[0];

	it('must have title', () => {
		expect($h1.innerText).to.be.a('string');
	});

	it('must have default title', () => {
		expect($h1.innerText).to.equal('Hello');
	});

	it('must have button title', () => {
		expect($btn.innerText).to.be.a('string');
	});

	it('must have button default title', () => {
		expect($btn.innerText).to.equal('Click');
	});

	it('must change title', () => {
		$btn.click();
		expect($h1.innerText).to.equal('Hello world');
	});

});

describe('unit suite', () => {

	const agent = window.navigator.userAgent;

	it('must be a atring', () => {
		expect(agent).to.be.a('string');
	});

	// Next test will fail in FireFox:

	//it('must be not gecko', () => {
	//	expect(agent.indexOf('ecko/')).to.equal(-1);
	//});

});