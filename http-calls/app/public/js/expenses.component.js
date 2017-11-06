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
        // update viewmodel without needing to make another api call
        vm.expenses.push(response.data);
      });
    }

    vm.toggleEditForm = function(expense) {
      delete vm.editedExpense; // clear form

      // if the form has only been clicked once, display the form and update expenseToEdit
      // if a different edit link is clicked, display the form and update expenseToEdit
      if (!vm.expenseToEdit || vm.expenseToEdit.id !== expense.id) {
        vm.showEditForm = true;
        vm.expenseToEdit = expense; // for storing expense that will be updated
      } else {
        vm.showEditForm = !vm.showEditForm;
      }
    }

    vm.updateExpense = function(expense) {
      $http.patch(`/api/expenses/${expense.id}`, vm.editedExpense).then(function (response) {
        // find the index of the updated expense
        for (var i = 0; i < vm.expenses.length; i++) {
          if (vm.expenses[i].id === expense.id) {
            // update values on viewmodel
            vm.expenses[i] = response.data;
          }
        }
      });
    }

    vm.destroy = function(expense) {
      $http.delete(`/api/expenses/${expense.id}`).then(function (response) {
        // find the index of the updated expense
        for (var i = 0; i < vm.expenses.length; i++) {
          if (vm.expenses[i].id === expense.id) {
            // update values on viewmodel
            vm.expenses.splice(i, 1);
          }
        }
      });
    }
  }

}());
