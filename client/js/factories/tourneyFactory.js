angular.module('tourneys', []).factory('Tourneys', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/tourneys');
    },

	create: function(tourney) {
	  return $http.post('http://localhost:8080/api/tourneys', tourney);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
	   return $http.delete('http://localhost:8080/api/tourneys/' + id);
    }
  };

  return methods;
});
