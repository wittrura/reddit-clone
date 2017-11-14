(function() {
  angular
    .module('app')
    .service('CommentService', service);

  function service($http) {
    this.createComment = function(postId, newComment) {
      return $http.post(`/api/posts/${postId}/comments`, newComment).then(response => {
        const newComment = response.data;
        return newComment;
      })
    };
  };
})()
