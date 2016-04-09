module.exports = function($location, $state, $sanitize, articles) {
	"ngInject";

	var vm = this;
	vm.articles = articles;
	vm.html = (str) => {
		var div = document.createElement('div')
		div.innerHTML = str
		return div.innerText
	}
	vm.getThumbnailUrl = (str) => {
		if (!str) return null;
		return `url(${str})`
	}
	vm.loadMore = () => {
		console.warn('vm.loadMore()')
	}
	return vm;
};
