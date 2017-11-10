(function() {
  angular.module('app')
  .component('comment', {
    bindings: {
      post: '='
    },
    controller: controller,
    templateUrl: 'comment/comment.component.html'
  })

  function controller(CommentService) {
    const vm = this;

    vm.createComment = function (e, comment, newCommentForm) {
      e.preventDefault();

      let newComment = {
        content: comment.content,
        post_id: vm.post.id
      }

      CommentService.createComment(vm.post.id, newComment).then(response => {
        vm.post.comments.push(response);
        newComment.content = "";
        newCommentForm.$setPristine();
      })
    }
  }
}())
