(function() {
  'use strict'

  angular.module('app')
    .component('houseShow', {
      controller: controller,
      template: `
        <h1>{{$ctrl.house.name}}</h1>

        <p>{{$ctrl.house.address}}</p>

        <!-- TODO: add link here -->
        <a ui-sref="home">Return Home</a>
      `
    });

    function controller (houseService, $state) {
      const vm = this

      vm.$onInit = function () {
        const houseId = $state.params.houseId;
        vm.house = houseService.findById(houseId)
      }
    }

}());
