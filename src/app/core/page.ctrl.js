module.exports = function (page, _initRowGallery,  $timeout) {
	"ngInject";

	var vm = this;
	vm.page = page;
	vm.page.$promise.then(() => {
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
}