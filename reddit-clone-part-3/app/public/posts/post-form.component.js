(function() {
  angular.module('app')
  .component('postForm', {
    bindings: {
      onCreatePost: '&',
    },
    controller: controller,
    templateUrl: 'posts/post-form.html'
  })

function controller(PostService) {
  const vm = this;

  vm.$onInit = function () {
  };

  vm.createPost = function (e) {
    e.preventDefault();

    PostService.createPost(vm.newPost).then(newPost => {
      vm.onCreatePost({newPost: newPost});

      // clean form
      delete vm.newPost;
      vm.newPostForm.$setPristine();
    })
  };

};
}());
