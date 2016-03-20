module.exports = function ($state, linkActive) {
	"ngInject";
	return {
		scope: true,
		restrict: "A",
		link: (scope, $el, $attrs) => {
			scope.isActive = function(href) {
				href || (href = '');
				var a = document.createElement('a');
				a.href = href;
				return new RegExp(`^${a.pathname}.*`).test(linkActive.currentHref);
			};
		}
	}
}