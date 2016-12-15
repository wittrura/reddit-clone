(function() {
  'use strict'

  angular.module('app', [])
    .component('page', {
      controller: function () {
        const vm = this

        vm.formatName = function () {
          let nameParts = [vm.firstName]
          if (vm.nickname) {
            nameParts.push(`"${vm.nickname}"`)
          }
          nameParts.push(vm.lastName)
          vm.formattedName = nameParts.join(' ')
        }
      },
      template: `
        <p><input ng-model="$ctrl.firstName" placeholder="First Name"/></p>
        <p><input ng-model="$ctrl.nickname" placeholder="Nickname"/></p>
        <p><input ng-model="$ctrl.lastName" placeholder="Last Name"/></p>
        <p><button ng-click="$ctrl.formatName()">Submit</button></p>

        <p>{{$ctrl.formattedName}}</p>
      `
    })

}());
