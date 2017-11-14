(function() {
  angular.module('app')
  .component('postEdit', {
    controller: controller,
    templateUrl: 'javascripts/posts/edit-post.component.html',
    bindings: {
      postToEdit: '<'
    }
  });

  function controller($state, PostService) {
    const vm = this;

    vm.$onInit = function () {
    };

    vm.editPost = function() {
      const postId = $state.params.postId;
      PostService.editPost(postId, vm.post).then(() => {
        delete vm.post;
        $state.go('postsList');
      });
    };
  };
}());
