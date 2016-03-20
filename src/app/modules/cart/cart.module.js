module.exports = angular.module('cart', [])
.config(require('./cart.router'))
.service('cart',require('./cart.service'))
.controller('cart.ctrl',require('./cart.ctrl'))