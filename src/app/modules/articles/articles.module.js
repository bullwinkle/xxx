module.exports = angular.module('articles', [])
.config(require('./articles.router'))
.factory('Articles',require('./articles.resource'))
.factory('articlesFactory',require('./articles.factory'))