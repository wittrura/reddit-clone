(function() {
  'use strict';

  angular.module('app').config(config)

  // TODO: figure out how to configure the app correctly
  // config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled: true
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        component: 'houseList'
      })
      .state('new', {
        url: '/houses/new',
        component: 'houseNew' // COMPONENT and NOT CONTROLLER
      })
      .state('house', {
        url: '/houses/{houseId}',
        component: 'houseShow'
      });

  }

}());
