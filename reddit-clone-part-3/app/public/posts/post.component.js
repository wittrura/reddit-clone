(function() {
  angular.module('app')
  .component('post', {
    bindings: {
      post: '='
    },
    controller: controller,
    templateUrl: 'posts/post.component.html'
  })

function controller(PostService) {
  const vm = this;

  vm.deletePost = function (e) {
    console.log('delete post');
    e.preventDefault();
    // destroy post
    // delegate to parent list to update posts array
    // PostService.destroyPost(post.id).then(() => {
    //   vm.posts.splice(vm.posts.indexOf(post), 1);
    // })
  }

  vm.upvotePost = function () {
    PostService.upvotePost(vm.post.id).then(() => {
      vm.post.vote_count += 1;
    })
  }

  vm.downvotePost = function () {
    if (vm.post.vote_count > 0) {
      PostService.downvotePost(vm.post.id).then(() => {
        vm.post.vote_count -= 1;
      })
    }
  }

  vm.addComment = function(comment) {
    vm.post.comments.push(comment);
  }

  vm.toggleComments = function(toggledPost) {
    console.log('toggle comments');
    // delegate to parent for toggling comments

    // vm.posts.forEach(post => {
    //   if(post.title === toggledPost.title) {
    //     post.showComments = !post.showComments;
    //   } else {
    //     post.showComments = false;
    //   }
    // })
  }
}
}())
