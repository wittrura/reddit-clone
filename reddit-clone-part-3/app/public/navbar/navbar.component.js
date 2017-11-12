(function() {
  angular.module('app')
  .component('navBar', {
    controller: controller,
    templateUrl: 'navbar/navbar.component.html'
  })

  function controller() {
    const vm = this;

    vm.$onInit = function () {
    };
    
  };
}())
