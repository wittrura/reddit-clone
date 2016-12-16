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
    vm.createPost = createPost

    function onInit() {
      $http.get('/api/posts')
        .then(response => vm.posts = response.data)
    }

    function createPost() {
      $http.post('/api/posts', vm.post)
        .then(response => {
          vm.posts.push(response.data)
          vm.layout.togglePostForm()
          delete vm.post
        })
    }

  }

}());
