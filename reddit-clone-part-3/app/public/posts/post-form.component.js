(function() {
  angular.module('app')
  .component('postForm', {
    bindings: {
      onCreatePost: '&',
      post: '<',
      option: '@',
    },
    controller: controller,
    templateUrl: 'posts/post-form.html'
  })

  function controller(PostService, $state) {
    const vm = this;

    vm.$onInit = function () {
      if (vm.option === 'edit') vm.submitText = 'Edit Post';
      if (vm.option === 'create') vm.submitText = 'Create Post';
    };

    vm.submitForm = function() {
      if (vm.option === 'edit') {
        vm.editPost()
      };
      if (vm.option === 'create') {
        vm.createPost()
      };
    };

    vm.createPost = function () {
      PostService.createPost(vm.post).then(newPost => {
        vm.onCreatePost({newPost: newPost});
        // clean form
        delete vm.post;
        vm.postForm.$setPristine();
      })
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
