module.exports = function ($timeout) {
	"ngInject";
	var perPage = 0;
	var disabled = false;

	return {
		restrict: 'C',
		link: (scope, $el, attrs) => {
			scope.$watch(attrs.perPage, (val) => {
				perPage = val
			});
			scope.$watch(attrs.isLoading, (val) => {
				if (!val || !val.$promise) return;
				$el.addClass('is-loading')
				val.$promise.then(res => $timeout(() => {
					$el.removeClass('is-loading')
					if (perPage && res.length < perPage) {
						disabled = true
						$el.addClass('disabled');
					}
				}, 100))
			})
		}
	}
}