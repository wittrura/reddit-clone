(function() {
  angular
    .module('app')
    .service('postsService', service);

  function service($http) {

    this.getPosts = function() {
      return $http.get('/api/posts').then(response => {
        const posts = response.data;
        console.log(response.data);
        return posts;
      });
    };

    this.createPost = function(post) {
      return $http.post('/api/posts', post).then(response => {
          // created_at added, vote_count initialized to 0 by postgres
          const newPost = response.data;
          newPost.comments = [];
          newPost.showComments = false;
          return newPost;
      });
    };

    this.destroyPost = function(postId) {
      return $http.delete(`/api/posts/${postId}`).then(response => {
        return;
      });
    };

    this.upvotePost = function(postId) {
      return $http.post(`/api/posts/${postId}/votes`).then(response => {
        return;
      });
    };

    this.downvotePost = function(postId) {
      return $http.delete(`/api/posts/${postId}/votes`).then(response => {
        return;
      });
    }

  }
})()
