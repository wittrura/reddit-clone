(function() {
  angular.module('app')
  .component('postsList', {
    controller: controller,
    templateUrl: 'posts/postListTemplate.html'
  })

// controller.$inject = ['$http'];
function controller($http) {
  const vm = this;

  vm.$onInit = function () {
    vm.newPostFormDisplay = false;
    vm.propertyName = 'vote_count';
    vm.reverse = true;

    $http.get('/api/posts').then(function(response) {
      vm.posts = response.data;
      console.log(vm.posts);
    });
  }

  vm.toggleNewPostForm = function() {
    vm.newPostFormDisplay = !vm.newPostFormDisplay;
  }

  vm.createPost = function (e) {
    e.preventDefault();

    $http.post('/api/posts', vm.newPost).then(function (response) {
        // created_at added, vote_count initialized to 0 by postgres
        response.data.comments = [];
        response.data.showComments = false;
        // update viewmodel without needing to make another api call
        vm.posts.push(response.data);
        delete vm.newPost;

        vm.newPostForm.$setPristine();
        vm.newPostFormDisplay = !vm.newPostFormDisplay;
    });
  }

  vm.deletePost = function (e, post) {
    e.preventDefault();
    $http.delete(`/api/posts/${post.id}`).then(function (response) {
      vm.posts.splice(vm.posts.indexOf(post), 1);
    });
  }

  vm.upvotePost = function (post) {
    $http.post(`/api/posts/${post.id}/votes`).then(function (response) {
      post.vote_count += 1;
    });
  }

  vm.downvotePost = function (post) {
    if (post.vote_count > 0) {
      $http.delete(`/api/posts/${post.id}/votes`).then(function (response) {
        post.vote_count -= 1;
      });
    }
  }

  vm.sortBy = function(e, propertyName) {
    e.preventDefault();
    // vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
    vm.propertyName = propertyName;
  };

  vm.createComment = function (e, post, comment, newCommentForm) {
    e.preventDefault();
    let newComment = {
      content: comment.content,
      post_id: post.id
    }
    
    $http.post(`/api/posts/${post.id}/comments`, newComment).then(function (response) {
      post.comments.push(response.data);
      newComment.content = "";
      newCommentForm.$setPristine();
    })
  }

  vm.toggleComments = function(toggledPost) {
    // post.showComments = !post.showComments;
    vm.posts.forEach(post => {
      if(post.title === toggledPost.title) {
        post.showComments = !post.showComments;
      } else {
        post.showComments = false;
      }
    })
  }
};


}());
