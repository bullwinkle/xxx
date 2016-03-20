module.exports = angular.module('catalog', [
	'cart'
])
.config(require('./catalog.router'))
.controller('catalogCtrl', require('./catalog.ctrl'))
.controller('productCtrl', require('./catalog-product.ctrl'))

.factory('MotoParts',require('./motoparts.resource'))
.factory('motoPartsFactory',require('./motoparts.factory'))

.factory('Motorcycles',require('./motorcycles.resource'))
.factory('motorcyclesFactory',require('./motorcycles.factory'))