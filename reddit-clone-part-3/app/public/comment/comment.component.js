(function() {
  angular.module('app')
  .component('comment', {
    bindings: {
      post: '<'
    },
    controller: controller,
    templateUrl: 'comment/comment.component.html'
  })

  function controller(CommentService, $scope) {
    const vm = this;

    vm.createComment = function (e) {
      e.preventDefault();

      let newComment = {
        content: vm.newComment.content,
        post_id: vm.post.id
      }

      // create comment in database, then emit event up to parent for adding
      // to 'in-memory' array
      CommentService.createComment(vm.post.id, newComment).then(response => {
        $scope.$emit('createComment', {comment: response})

        // clean form
        delete vm.newComment;
        vm.newCommentForm.$setPristine();
      })
    }
  }
}())
