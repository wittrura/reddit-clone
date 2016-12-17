(function() {
  'use strict'

  angular.module('app')
    .component('posts', {
      require: {
        layout: '^app'
      },
      templateUrl: '/js/posts/posts.template.html',
      controller: controller
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.togglePostForm = togglePostForm
    vm.createPost = createPost
    vm.createComment = createComment
    vm.voteUp = voteUp
    vm.voteDown = voteDown

    function onInit() {
      $http.get('/api/posts')
        .then(response => vm.posts = response.data)
    }

    function togglePostForm() {
      vm.addingPost = !vm.addingPost
    }

    function createPost() {
      $http.post('/api/posts', vm.post)
        .then(response => {
          vm.posts.push(response.data)
          vm.layout.togglePostForm()
          delete vm.post
        })
    }

    function createComment(post) {
      $http.post(`/api/posts/${post.id}/comments`, post.newComment )
        .then(response => {
          post.comments.push(response.data)
          delete post.newComment
        })
    }

    function voteUp(post) {
      $http.post(`/api/posts/${post.id}/votes`)
        .then(response => {
          post.vote_count = response.data.vote_count
        })
    }

    function voteDown(post) {
      $http.delete(`/api/posts/${post.id}/votes`)
        .then(response => {
          post.vote_count = response.data.vote_count
        })
    }

  }

}());
