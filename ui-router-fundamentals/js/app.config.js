(function() {
  'use strict';

  angular.module('app').config(config)

  // TODO - why is this not required?
  // config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled: true
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        component: 'houseList' // COMPONENT and NOT CONTROLLER
      })
      .state('new', {
        url: '/houses/new',
        component: 'houseNew'
      })
      .state('house', {
        url: '/houses/{houseId}',
        component: 'houseShow'
      });

  }

}());
