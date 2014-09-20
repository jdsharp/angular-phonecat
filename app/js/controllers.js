'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneSearchCtrl', ['$scope', '$state', 'SearchHistory', 
  function($scope, $state, SearchHistory) {
    $scope.orderProp     = 'age';
    $scope.searchHistory = SearchHistory.getObservable();

    $scope.focusSearch = function() {
      $state.go('phones.list');
    };

    $scope.clearHistory = function() {
      SearchHistory.clear();
    };
  }]);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 
  function($scope, Phone) {
    $scope.phones = Phone.query();
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$stateParams', 'Phone', 'SearchHistory',
  function($scope, $routeParams, $stateParams, Phone, SearchHistory) {
    $scope.phone = Phone.get({phoneId: $stateParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
     
      // Prevent padding this to the history
      if ( !$stateParams.src || ($stateParams.src !== 'history') ) {
        SearchHistory.add({
          id:   phone.id,
          name: phone.name
        });
      }
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
