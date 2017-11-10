(function() {
  angular.module('app')
  .component('postsList', {
    controller: controller,
    templateUrl: 'posts/postListTemplate.html'
  })

function controller(PostService) {
  const vm = this;

  vm.$onInit = function () {
    vm.newPostFormDisplay = false;
    vm.propertyName = 'vote_count';
    vm.reverse = true;

    PostService.getPosts().then(posts => vm.posts = posts);
  }

  vm.toggleNewPostForm = function() {
    vm.newPostFormDisplay = !vm.newPostFormDisplay;
  }

  vm.createPost = function (e) {
    e.preventDefault();

    PostService.createPost(vm.newPost).then(newPost => {
      // update viewmodel without needing to make another api call
      vm.posts.push(newPost);

      // clean form
      delete vm.newPost;
      vm.newPostForm.$setPristine();
      vm.newPostFormDisplay = !vm.newPostFormDisplay;
    })
  }

  vm.deletePost = function (e, post) {
    e.preventDefault();
    PostService.destroyPost(post.id).then(() => {
      vm.posts.splice(vm.posts.indexOf(post), 1);
    })
  }

  vm.upvotePost = function (post) {
    PostService.upvotePost(post.id).then(() => {
      post.vote_count += 1;
    })
  }

  vm.downvotePost = function (post) {
    if (post.vote_count > 0) {
      PostService.downvotePost(post.id).then(() => {
        post.vote_count -= 1;
      })
    }
  }

  vm.toggleComments = function(toggledPost) {
    vm.posts.forEach(post => {
      if(post.title === toggledPost.title) {
        post.showComments = !post.showComments;
      } else {
        post.showComments = false;
      }
    })
  }
  vm.sortBy = function(e, propertyName) {
    e.preventDefault();
    // vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
    vm.propertyName = propertyName;
  };


  vm.addComment = function(comment, post) {
    post.comments.push(comment);
  }
};


}());
