(function() {
  angular.module('app')
  .component('postEdit', {
    controller: controller,
    templateUrl: 'posts/edit.html'
  });

  function controller($state, PostService) {
    const vm = this

    vm.$onInit = function () {
      const postId = $state.params.postId;
      PostService.getPost(postId).then(post => {
        vm.postToEdit = post;
        vm.post = post;
      })
    };

    vm.editPost = function() {
      const postId = $state.params.postId;
      PostService.editPost(postId, vm.post).then(() => {
        delete vm.post;
        $state.go('postsList')
      })
    }
  }
}());
