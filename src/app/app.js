import './app.styl';
import tpl from './app.jade';
import Calc from '../modules/calc/calc';

document.body.innerHTML = tpl;

document
	.querySelector('button')
	.addEventListener('click', onClick);

function onClick () {
	console.log('clicked');
	document
		.querySelector('h1')
		.innerText = 'Hello world';
}