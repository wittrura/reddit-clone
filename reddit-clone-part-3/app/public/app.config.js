(function() {
  angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

      // remove pound sign from routes
      $locationProvider.html5Mode({
        enabled: true
      });

      // redirect any non-found routes to main posts page
      $urlRouterProvider.otherwise('/posts');

      var postsList = {
        name: 'postsList',
        url: '/posts',
        component: 'postsList'
      };

      var postEdit = {
        name: 'postEdit',
        url: '/posts/{postId}/edit',
        component: 'postEdit'
      };

      $stateProvider
        .state(postsList)
        .state(postEdit);
    });
})();
