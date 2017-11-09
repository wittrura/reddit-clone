(function() {
  angular.module('app')
  .component('postEdit', {
    controller: controller,
    templateUrl: 'posts/edit.html'
  });

  function controller($state, postsService) {
    const vm = this

    vm.$onInit = function () {
      const postId = $state.params.postId;
      postsService.getPost(postId).then(post => {
        vm.postToEdit = post;
        vm.post = post;
      })
    };

    vm.editPost = function() {
      const postId = $state.params.postId;
      postsService.editPost(postId, vm.post).then(() => {
        delete vm.post;
        $state.go('postsList')
      })
    }
  }
}());
