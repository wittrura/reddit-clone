(function() {
  'use strict'

  angular.module('app')
    .component('houseNew', {
      controller: controller,
      template: `
        <h1>New House</h1>

        <form ng-submit="$ctrl.addHouse()">
          <p>
            Name: <input ng-model="$ctrl.house.name">
          </p>
          <p>
            Address: <input ng-model="$ctrl.house.address">
          </p>
          <p>
            <button type="submit">Create House</button>
          </p>
        </form>
      `
    });

    function controller ($state, houseService) {
      const vm = this;

      vm.$onInit = function () {
        vm.houses = houseService.houses;
      }

      vm.addHouse = function () {
        houseService.addHouse(vm.house);
        $state.go('house', {houseId: houseService.houses.length});
      }
    }

}());
