(function() {
  angular.module('app')
  .component('comment', {
    bindings: {
      post: '<',
      onCreateComment: '&'
    },
    controller: controller,
    templateUrl: 'comment/comment.component.html'
  })

  function controller(CommentService) {
    const vm = this;

    vm.createComment = function (e) {
      e.preventDefault();

      let newComment = {
        content: vm.newComment.content,
        post_id: vm.post.id
      };

      // create comment in database, then emit event up to parent for adding
      // to 'in-memory' array
      CommentService.createComment(vm.post.id, newComment).then(response => {
        vm.onCreateComment({comment: response});

        // clean form
        delete vm.newComment;
        vm.newCommentForm.$setPristine();
      });
    };
  };
}())
