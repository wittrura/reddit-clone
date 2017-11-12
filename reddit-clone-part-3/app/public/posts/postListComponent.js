(function() {
  angular.module('app')
  .component('postsList', {
    controller: controller,
    templateUrl: 'posts/postListTemplate.html'
  })

function controller(PostService) {
  const vm = this;

  vm.$onInit = function () {
    vm.newPostFormDisplay = false;
    vm.propertyName = 'vote_count';
    vm.reverse = true;

    PostService.getPosts().then(posts => vm.posts = posts);
  };

  vm.toggleNewPostForm = function() {
    vm.newPostFormDisplay = !vm.newPostFormDisplay;
  };

  // received from child postForm component
  vm.createPost = function (newPost) {
    vm.posts.push(newPost);
    vm.toggleNewPostForm();
  };

  // received from child post component
  vm.deletePost = function (post) {
    vm.posts.splice(vm.posts.indexOf(post), 1);
  };

  // received from child post component
  vm.updatePost = function (post, prop, val) {
    post[prop] = val;
  };

  vm.toggleComments = function (toggledPost) {
    vm.posts.forEach(post => {
      if(post.id === toggledPost.id) {
        post.showComments = !post.showComments;
      } else {
        post.showComments = false;
      }
    });
  };

  vm.sortBy = function(e, propertyName) {
    e.preventDefault();
    // vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
    vm.propertyName = propertyName;
  };

};
}());
