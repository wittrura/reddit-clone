(function() {
  angular.module('app')
  .component('comment', {
    bindings: {
      post: '<',
      onUpdate: '&'
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

      // create comment in database, then delegate up to parent for adding
      // to 'in-memory' array
      CommentService.createComment(vm.post.id, newComment).then(response => {
        vm.onUpdate({comment: response, post: vm.post})
        newComment.content = "";
        newCommentForm.$setPristine();
      })
    }
  }
}())
