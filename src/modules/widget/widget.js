import './widget.styl';
import template from './widget.jade';

export default class Widget {

	constructor (el) {
		this.el = el;
		this.template = template;
		this.render();
	}

	render () {
		this.el.innerHTML = this.template;
	}
}