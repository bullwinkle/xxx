module.exports = angular.module('app.core', [])
.factory('Menus', require('./menu.resource'))
.factory('Pages', require('./pages.resource'))
.factory('Posts', require('./posts.resource'))
.factory('Categories', require('./categories.resource'))
.factory('Tags', require('./tags.resource'))
.factory('Mail', require('./mail.resource'))