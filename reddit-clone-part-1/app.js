(function() {
  angular.module('app', [])
  .component('app', {
    controller: function() {
      const vm = this;

      vm.$onInit = function () {
        vm.newPostFormDisplay = true;
      }

      vm.toggleNewPostForm = function() {
        vm.newPostFormDisplay = !vm.newPostFormDisplay;
      }
    },

    templateUrl: 'template.html'
  })
}());
