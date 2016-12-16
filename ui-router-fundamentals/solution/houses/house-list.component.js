(function() {
  'use strict'

  angular.module('app')
    .component('houseList', {
      controller: function (houseService) {
        const vm = this

        vm.$onInit = function () {
          vm.houses = houseService.houses
        }
      },
      template: `
        <h1>Houses</h1>

        <ul>
          <li ng-repeat="house in $ctrl.houses">
            <a ui-sref="show-house({id: house.id})">{{house.name}}</a>
          </li>
        </ul>

        <a ui-sref="new-house">Add House</a>
      `
    })

}());
