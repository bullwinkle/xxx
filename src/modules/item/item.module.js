import itemTemplate from './item.jade';
import itemsTemplate from './items.jade';

angular
	.module('item', [])
	.config(configureStates)
	.constant('API_URL', '/api/items/')
	.factory('itemsFactory', itemsFactory)
	.directive('item', itemDirectiveFactory)
	.controller('ItemController', ItemController)
	.controller('ItemsController', ItemsController);

// @ngInject
function configureStates ($stateProvider) {
	$stateProvider.state('items', {
		url: '/items',
		template: itemsTemplate,
		controller: 'ItemsController as vm'
	});
}

// @ngInject
function itemsFactory (API_URL, $http, _) {

	class Items {
		constructor () {
			this.items = [];
		}
		query () {
			this.items = [];
			$http.get(API_URL).then(res => {
				res.data.data.items.map(item => {
					this.items.push(item);
				});
			});
			return this.items;
		}
		edit ({id, data}) {
			$http.post(`${API_URL}/${id}`, data).then(res => {
				const item = _.find(this.items, {id});
				Object.assign(item, res.data.data.item);
			});
		}
		create ({data}) {
			$http.post(API_URL, data).then(res => {
				this.items.push(res.data.data.item);
			});
		}
		remove ({id}) {
			$http.delete(`${API_URL}/${id}`).then(() => {
				_.remove(this.items, {id});
			});
		}
	}

	return new Items();

}

// @ngInject
function ItemsController (itemsFactory) {

	const vm = this;

	vm.data = {};
	vm.items = itemsFactory.query();

	Object.assign(vm, {create});

	function create () {
		itemsFactory.create({data: vm.data});
		vm.data = {};
	}

}

// @ngInject
function ItemController (itemsFactory, $mdDialog) {

	const vm = this;

	vm.editMode = false;
	vm.editable = {};

	Object.assign(vm, {
		edit,
		exit,
		save,
		remove
	});

	function edit () {
		vm.editMode = true;
		Object.assign(vm.editable, vm.item);
	}

	function exit () {
		vm.editMode = false;
		vm.editable = {};
	}

	function save () {
		itemsFactory.edit({
			id: vm.item.id,
			data: vm.editable
		});
		exit();
	}

	function remove () {

		const dialog = $mdDialog.confirm({
			title: 'Delete item',
			textContent: 'Really want to delete?',
			ok: 'Yes'
		});

		const promise = $mdDialog.show(dialog);

		promise.then(() => {
			itemsFactory.remove({
				id: vm.item.id
			});
		});

	}

}

// @ngInject
function itemDirectiveFactory () {

	function link (scope) {
		scope.vm.item = scope.item;
	}

	return {
		link,
		restrict: 'E',
		replace: true,
		template: itemTemplate,
		controller: 'ItemController as vm'
	};

}

