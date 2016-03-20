module.exports = function ($scope, $element, $attrs) {
	"ngInject";

	/*
	available attrs:
	categories: {[]}	| original categories storage
	root: ''			| only this category children will be taken
	findBy: ''			| field, by which to find parent, default is 'slug'
	parent-id: ''		| name of 'parentId' parametr
	*/

	var vm = $scope;
	vm.makeCategoriesTree = (data) => {
		var groupedByParents = _.groupBy(data, 'parent');
		var catsById = _.keyBy(data, 'id');
		_.each(_.omit(groupedByParents, "0"), function (children, parentId) {
			catsById[parentId].children = children;
		});
		var result = groupedByParents['0'];

		// take just defined root category children
		if ($attrs.root) {
			var findBy = $attrs.findBy || 'slug'
			var root = _.get(_.find(result, (category) => _.result(category,`${findBy}.toLowerCase`) == $attrs.root ), 'children')
			return root;
		}
		return result;
	}
	if (vm.categories && vm.categories.$promise) {
		vm.categories.$promise.then(() => {
			vm.categoriesTree = vm.makeCategoriesTree( vm.categories );
		})
	} else if (vm.categories) {
		vm.categoriesTree = vm.categories
	}

	return vm
}