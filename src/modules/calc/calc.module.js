import './calc.styl';
import './calc.jade';

angular
	.module('calc', [])
	.config(configureStates)
	.factory('calc', calcFactory)
	.directive('calc', calcDirective)
	.controller('CalcController', CalcController);

// @ngInject
function configureStates ($stateProvider) {
	$stateProvider.state('calc', {
		url: '/calc',
		template: '<calc>'
	});
}

// @ngInject
function calcFactory () {
	return {
		add: function (a, b) {
			return a + b;
		}
	};
}

// @ngInject
function calcDirective () {
	return {
		restrict: 'EA',
		controller: 'CalcController as vm',
		templateUrl: 'tpl/modules/calc/calc.jade'
	};
}

// @ngInject
function CalcController (calc) {
	const vm = this;
	vm.title = calc.add('Hello ', 'world!');
	vm.change = () => {
		vm.title = calc.add('Hello ', 'mamka!');
	};
}