(function() {
  angular.module('app', [])
  .component('app', {
    controller: function() {
      const vm = this;

      vm.$onInit = function () {
        vm.newPostFormDisplay = true;
        vm.posts = [];
      }

      vm.toggleNewPostForm = function() {
        vm.newPostFormDisplay = !vm.newPostFormDisplay;
      }

      vm.createPost = function (e) {
        e.preventDefault();
        vm.posts.push(vm.newPost);
        delete vm.newPost;
      }

      vm.deletePost = function (e, post) {
        e.preventDefault();
        vm.posts.splice(vm.posts.indexOf(post), 1);
      }
    },

    templateUrl: 'template.html'
  })
}());
