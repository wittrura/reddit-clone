(function() {
  angular.module('app', ['angularMoment'])
  .component('app', {
    controller: function() {
      const vm = this;

      vm.$onInit = function () {
        vm.newPostFormDisplay = true;
        vm.propertyName = 'score';
        vm.reverse = true;
        vm.posts = [
          {title: 'this is a guy with a beard', body: 'what is with all the beards?', author: 'bondy', imageUrl: 'https://static.pexels.com/photos/211050/pexels-photo-211050.jpeg', score: 0, date: new Date(2017, 10, 1, 9, 10, 20, 30)},
          {title: 'more beards', body: 'srsly?', author: 'russ', imageUrl: 'https://static.pexels.com/photos/69212/pexels-photo-69212.jpeg', score: 0, date: new Date(2017, 10, 2, 9, 20, 20, 30)},
          {title: 'not trying at all', body: "she's so... uniqiue", author: 'ryan', imageUrl: 'https://static.pexels.com/photos/192440/pexels-photo-192440.jpeg', score: 0, date: new Date(2017, 10, 2, 16, 23, 40, 30)}
        ];
      }

      vm.toggleNewPostForm = function() {
        vm.newPostFormDisplay = !vm.newPostFormDisplay;
      }

      vm.createPost = function (e) {
        e.preventDefault();
        vm.newPost.score = 0;
        vm.newPost.date = new Date();
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

      vm.sortBy = function(e, propertyName) {
        e.preventDefault();
        // vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
        vm.propertyName = propertyName;
      };
    },

    templateUrl: 'template.html'
  })
}());
