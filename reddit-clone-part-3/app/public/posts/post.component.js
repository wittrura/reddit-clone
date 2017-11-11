(function() {
  angular.module('app')
  .component('post', {
    bindings: {
      post: '<',
      onDelete: '&',
      onUpdate: '&'
    },
    controller: controller,
    templateUrl: 'posts/post.component.html'
  })

function controller(PostService, $scope) {
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

  $scope.$on('createComment', (event, args) => {
    vm.post.comments.push(args.comment);
  });

  vm.toggleComments = function() {
    // emits event to be handled by parent component
    $scope.$emit('toggleComments', {post: vm.post});
  }
}
}())
