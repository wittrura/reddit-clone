(function() {
  angular.module('app')
  .component('post', {
    bindings: {
      post: '<',
      onDelete: '&',
      onUpdate: '&',
      onToggleComments: '&',
    },
    controller: controller,
    templateUrl: 'javascripts/posts/post.component.html'
  })

function controller(PostService) {
  const vm = this;

  vm.deletePost = function (e) {
    e.preventDefault();
    // destroy post
    PostService.destroyPost(vm.post.id).then(() => {
      // delegate to parent list to update posts array
      vm.onDelete({post: vm.post})
    })
  }

  vm.upvotePost = function () {
    PostService.upvotePost(vm.post.id).then(() => {
      vm.onUpdate({post: vm.post, prop: 'vote_count', val: vm.post.vote_count + 1});
    })
  }

  vm.downvotePost = function () {
    if (vm.post.vote_count > 0) {
      PostService.downvotePost(vm.post.id).then(() => {
        vm.onUpdate({post: vm.post, prop: 'vote_count', val: vm.post.vote_count - 1});
      })
    }
  }

  vm.createComment = function (comment) {
    vm.post.comments.push(comment);
  };

  vm.toggleComments = function() {
    vm.onToggleComments({post: vm.post});
  }
}
}())
