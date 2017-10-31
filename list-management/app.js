(function() {
  'use strict'

  angular.module('app', [])
    .component('cart', {
      controller: function() {
        const vm = this

        vm.$onInit = function () {
          vm.items = [
            {name: 'Apples', quantity: 4},
            {name: 'Avocados', quantity: 2}
          ];
        }

        vm.createItem = function() {
          vm.items.push(vm.item);
          delete vm.item;
        }

        vm.deleteItem = function(e, item) { // include event for preventDefault
          e.preventDefault();
          vm.items.splice(vm.items.indexOf(item), 1);
        }
      },
      templateUrl: 'cartForm.html'
    })
}());
