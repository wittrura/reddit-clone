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

    vm.toggleEditForm = function(expense) {
      // clear form
      delete vm.editedExpense;

      // if the form has only been clicked once, display the form and update expenseToEdit
      // if a different edit link is clicked, display the form and update expenseToEdit
      if (!vm.expenseToEdit || vm.expenseToEdit.id !== expense.id) {
        vm.showEditForm = true;
        // for storing expense that will be updated
        vm.expenseToEdit = expense;
      } else {
        vm.showEditForm = !vm.showEditForm;
      }

      console.log(vm.expenseToEdit);
    }

    vm.updateExpense = function(expense) {
      console.log(expense);
      console.log(vm.editedExpense);
    }

    vm.destroy = function(expense) {
      console.log(expense);
    }
  }

}());
