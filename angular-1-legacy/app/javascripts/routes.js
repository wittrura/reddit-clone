app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: './partials/main.html',
    controller: 'main'
  })
  .when('/listings', {
    templateUrl: './partials/listings.html',
    controller: 'listings'
  })
  .otherwise({redirectTo:'/'});
  $locationProvider.html5Mode(true);
})
