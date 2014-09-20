'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'ui.router'
]);

// phonecatApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/phones', {
//         templateUrl: 'partials/phone-list.html',
//         controller: 'PhoneListCtrl'
//       }).
//       when('/phones/:phoneId', {
//         templateUrl: 'partials/phone-detail.html',
//         controller: 'PhoneDetailCtrl'
//       }).
//       otherwise({
//         redirectTo: '/phones'
//       });
//   }]);

phonecatApp.config(function($stateProvider, $urlRouterProvider) {
  // Default Route (and for any other route not mapped)
  $urlRouterProvider.otherwise('/phones/list');
  
  // Now set up the states
  $stateProvider
    .state('phones', {
      url:         '/phones',
      templateUrl: 'partials/search.html',
      controller:  'PhoneSearchCtrl'
    })
    .state('phones.list', {
      url:         '/list',
      templateUrl: 'partials/phone-list.html',
      controller:  'PhoneListCtrl'
    })
    .state('phones.detail', {
      url:         '/:phoneId?src',
      templateUrl: 'partials/phone-detail.html',
      controller:  'PhoneDetailCtrl'
    });
});
