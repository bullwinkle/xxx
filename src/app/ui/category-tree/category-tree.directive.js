module.exports = function () {
	return {
		restrict: 'A',
		scope: {
			categories: '='
		},
		controller: require('./category-tree.ctrl'),
		controllerAs: 'vm',
		template: require('./category-tree.tpl.jade')
	}
}