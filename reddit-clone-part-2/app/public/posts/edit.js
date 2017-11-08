(function() {
  angular.module('app')
  .component('postEdit', {
    controller: controller,
    templateUrl: 'posts/edit.html'
  });

  function controller($state, $http) {
    const vm = this

    vm.$onInit = function () {
      const postId = $state.params.postId;
      $http.get(`/api/posts/${postId}`).then(function(response) {
        vm.postToEdit = response.data;
        console.log(vm.postToEdit);
      });
    }
  }
}());
