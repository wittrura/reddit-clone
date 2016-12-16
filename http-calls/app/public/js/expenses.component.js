(function() {
  'use strict'

  angular.module('app')
    .component('expenses', {
      controller: controller,
      template: `
        <h1>Expenses</h1>

        <form ng-submit="$ctrl.addExpense()">
          <p>
            Name: <input ng-model="$ctrl.expense.category">
          </p>
          <p>
            Amount: <input type="text" ng-model="$ctrl.expense.amount">
          </p>
          <p>
            <button type="submit">Add Expense</button>
          </p>
        </form>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="expense in $ctrl.expenses">
              <td>{{expense.id}}</td>
              <td>{{expense.category}}</td>
              <td>{{expense.amount}}</td>
              <td>
                <a href="#" ng-click="$ctrl.editExpense($event, expense)">edit</a>
                <a href="#" ng-click="$ctrl.deleteExpense($event, expense)">delete</a>
              </td>
            </tr>
          </tbody>
        </table>

        <form ng-submit="$ctrl.updateExpense()" ng-if="$ctrl.editingExpense">
          <p>
            Name: <input ng-model="$ctrl.editingExpense.category">
          </p>
          <p>
            Amount: <input type="text" ng-model="$ctrl.editingExpense.amount">
          </p>
          <p>
            <button type="submit">Update Expense</button>
          </p>
        </form>

      `
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.addExpense = addExpense
    vm.deleteExpense = deleteExpense
    vm.editExpense = editExpense
    vm.updateExpense = updateExpense

    function onInit() {
      $http.get('/api/expenses').then(function (response) {
        vm.expenses = response.data
      })
    }

    function addExpense() {
      $http.post('/api/expenses', vm.expense)
        .then(function (response) {
          vm.expenses.push(response.data)
          delete vm.expense
        })
    }

    function updateExpense() {
      $http.patch(`/api/expenses/${vm.editingExpense.id}`, vm.editingExpense)
        .then(function (response) {
          const expense = response.data
          const originalExpense = vm.expenses.find(e => e.id == expense.id)
          Object.assign(originalExpense, expense)
          delete vm.editingExpense
        })
    }

    function deleteExpense(e, expense) {
      e.preventDefault()
      $http.delete(`/api/expenses/${expense.id}`)
        .then(function () {
          vm.expenses.splice(vm.expenses.indexOf(expense))
        })
    }

    function editExpense(e, expense) {
      e.preventDefault()
      vm.editingExpense = angular.copy(expense)
    }
  }

}());
