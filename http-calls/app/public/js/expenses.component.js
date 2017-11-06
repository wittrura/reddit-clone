(function() {
  'use strict'

  angular.module('app')
    .component('expenses', {
      controller: controller,
      templateUrl: 'js/expenses.component.html'
    })

  controller.$inject = ['$http'];
  function controller($http) {
    const vm = this;

    vm.$onInit = function () {
      $http.get('/api/expenses').then(function (response) {
        vm.expenses = response.data;
      });
    }

    vm.addExpense = function() {
      $http.post('/api/expenses', vm.newExpense).then(function (response) {
        vm.expenses.push(response.data);
      });
    }
  }

}());
