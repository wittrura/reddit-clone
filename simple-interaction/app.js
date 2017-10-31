(function() {
  'use strict'
  angular.module('app', [])
    .component('app', {
      controller: function () {
        const vm = this

        vm.updateFullName = function () {
          if (vm.nickname) {
            vm.fullName = `${vm.firstName} "${vm.nickname}" ${vm.lastName}`;
          } else {
            vm.fullName = `${vm.firstName} ${vm.lastName}`;
          }
        }
      },
      templateUrl: 'namesForm.html'
    });
}());
