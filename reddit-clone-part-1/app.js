(function() {
  angular.module('app', [])
  .component('app', {
    controller: function() {
      const vm = this;

      vm.$onInit = function () {
        vm.newPostFormDisplay = true;
        vm.posts = [
          {title: 'this is a guy with a beard', body: 'what is with all the beards?', author: 'bondy', imageUrl: 'https://static.pexels.com/photos/211050/pexels-photo-211050.jpeg', score: 0},
          {title: 'more beards', body: 'srsly?', author: 'russ', imageUrl: 'https://static.pexels.com/photos/69212/pexels-photo-69212.jpeg', score: 0},
          {title: 'not trying at all', body: "she's so... uniqiue", author: 'ryan', imageUrl: 'https://static.pexels.com/photos/192440/pexels-photo-192440.jpeg', score: 0}
        ];
      }

      vm.toggleNewPostForm = function() {
        vm.newPostFormDisplay = !vm.newPostFormDisplay;
      }

      vm.createPost = function (e) {
        e.preventDefault();
        vm.posts.push(vm.newPost);
        delete vm.newPost;
        vm.newPostForm.$setPristine();
      }

      vm.deletePost = function (e, post) {
        e.preventDefault();
        vm.posts.splice(vm.posts.indexOf(post), 1);
      }

      vm.upvotePost = function (post) {
        post.score += 1;
      }

      vm.downvotePost = function (post) {
        if (post.score > 0) post.score -= 1;
      }
    },

    templateUrl: 'template.html'
  })
}());
