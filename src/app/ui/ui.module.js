require('angular-utils-pagination')
require('./breadcrumbs/breadcrumbs.styl')

module.exports = angular
	.module('ui', [
		'angularUtils.directives.dirPagination'
	])
	.directive('uiBreadcrumbs', require('./breadcrumbs/breadcrumbs.directive.js'))
	.directive('uiTreeList', require('./category-tree/category-tree.directive.js'))
	.directive('uiLoadMoreButton', require('./load-more-button.directive'))
	.directive('uiLinkActive', require('./link-active.directive.js'))
	.factory('linkActive', require('./link-active.factory.js'))
	//.directive('gallery', require('./carousel/carousel-gallery.directive.js'))
	.factory('_initRowGallery', require('./carousel/carousel-row.factory.js'))
	.factory('_initFullGallery', require('./carousel/carousel-gallery.factory.js'))