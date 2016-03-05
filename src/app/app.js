import './app.styl';
import tpl from './app.jade';

document.body.innerHTML = tpl;

document
	.querySelector('button')
	.addEventListener('click', onClick);

console.log('=== APP STARTED ===');
console.log(`=== ${window.location} ===`);

function onClick () {
	document
		.querySelector('h1')
		.innerText = 'Hello world';
}