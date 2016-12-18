(function() {
  'use strict'

  angular.module('app')
    .component('post', {
      templateUrl: '/js/posts/post.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams']
  function controller($http, $stateParams) {
    const vm = this

    vm.$onInit = onInit
    vm.createComment = createComment

    function onInit() {
      $http.get(`/api/posts/${$stateParams.id}`)
        .then(response => {
          vm.post = response.data
          $http.get(`/api/posts/${$stateParams.id}/comments`)
            .then(response => {
              vm.post.comments = response.data
            })
        })
    }

    function createComment() {
      $http.post(`/api/posts/${$stateParams.id}/comments`, vm.newComment)
        .then(response => {
          vm.post.comments.push(response.data)
          delete vm.newComment
        })
    }

  }

}());
