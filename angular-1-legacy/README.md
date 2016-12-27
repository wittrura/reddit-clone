# Translating Angular 1 Applications

## Setup

```
yarn
npm start
```

To run tests, run `npm test`

## Upgrade to Components

NOTE: Whenever you convert from a template/controller to a component, you must also convert to use the `controllerAs` syntax:

- `$ctrl.foo()` instead of just `foo()` in the template
- `const vm = this;  vm.foo = function()` instead of `$scope.foo = function()` in the controller

There should be no references to `$scope` in this example when you are done.

**#1 - Upgrade the router**

This example uses `ng-route`, which is an older and less capable router.  Upgrade to ui-router 1.0+ (or whatever the latest 1.0 beta is).

**#2 - Convert MainController to a component**

Open up `app/index.html` and you'll notice that there is an `ng-controller` directive right in the HTML.  This is an older way of writing Angular 1 applications, and has been replaced by components.

Since it's on every page, but doesn't necessarily have it's own route, you should make this an abstract state in ui-router.

**#3 - Convert route templates/controllers to components**

Routing directly to templates / controllers is an older way of organizing Angular 1 applications.  Convert these routes to components.

**#4 - Convert inline initialization to `$onInit`**

Any initialization (outside of defining event handlers) should happen on `$onInit`.

## Upgrade to Angular Style Guide (John Papa)

**#1 - Convert all injections to be declarative**

You'll see this:

```js
function($scope, $sce, quoteService) {
  // ...
}
```

Or this:

```js
controller: ['$scope', '$sce', 'quoteService', function($scope, $sce, quoteService) {
  // ...
}]
```

Neither of these is ideal.  Convert them to use the `.$inject` method of declaring dependencies.

**#2 - Rename files**

Notice how in this app the files are named after the function of the code (controllers, services etc...).

Rename these files after their _domain_ concept, like "people" or "orders".

Be sure to still name the files after their functional type like `foo.service.js`

**#3 - Remove app global**

Notice how there is a global `app` variable.  Convert that to the Angular module lookup pattern:

```
angular.module('foo').component(...)
```

**#4 - Use IIFEs**

Now that you have removed the app global, wrap each file in an IIFE.

**#5 - Change the service to use `this`**

In Angular, Services should always attach methods to `this` instead of returning new objects.
