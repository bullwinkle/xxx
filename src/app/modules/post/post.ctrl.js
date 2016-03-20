module.exports = function ($location, $state, post, categories, tags, $timeout, _initRowGallery) {
	"ngInject";

	var vm = this;
	vm.post = post;
	vm.post.$promise.then(() => {
		vm.post.categoriesLinks = _.mapEntityByIds(vm.post.categories, categories);
		vm.post.tagsLinks = _.mapEntityByIds(vm.post.tags, tags);

		//TODO: REFACTOR THIS BIG PEACE OF SHIT
		$timeout(() => {
			_initRowGallery()
			var $scrScripts = $("article script[src]")
			$scrScripts.each((i, script) => {
				var $scrScript = $(script)
				var src = $scrScript.attr('src')
				var $newScript = $('<script type="text/javascript">')
				$newScript.attr('src',src);
				$newScript.prependTo('head')
				setTimeout(() => {
					$newScript.remove()
				})
			})
		},100)

	})
	return vm;
};
