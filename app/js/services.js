'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

phonecatServices.factory('SearchHistory', [
  function() {
    var maxHistoryItems = 10;

    // This is a small storage wrapper around local storage. If local storage 
    // isn't available it defaults to an in memory store.
    var storage = (function() {
      var key  = 'phoneSearchHistory';
      var data = {};
      try {
        if ( 'localStorage' in window && window['localStorage'] !== null ) {
          data = localStorage;
        }
      } catch (e) { }

      var get = function() {
        return JSON.parse(data[key]);
      };
      var set = function(items) {
        data[key] = JSON.stringify(items);
      };

      // Initialize our storage if it isn't an empty array
      if ( !data[key] ) {
        set([]);
      }

      return {
        get: get,
        set: set
      };
    }());

    var observable = storage.get();

    return {
      add: function(phoneObj) {
        // Get our current array of items
        var items = storage.get();

        // Do not duplicate the last entry if it is the same as the one we're adding
        if ( items.length == 0 || ( items[0].id != phoneObj.id ) ) {
          items.unshift(phoneObj);
        }

        // Limit the history to the last maxHistoryItems length
        if ( items.length > maxHistoryItems ) {
          items = items.slice(0, maxHistoryItems);
        }
        storage.set(items);

        angular.copy(items, observable);
      },
      get: function() {
        return storage.get();
      },
      getObservable: function() {
        return observable;
      }
    };
  }]);