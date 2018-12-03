angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/users');
    },

		create: function(user) {
	  	return $http.post('http://localhost:8080/signup', user);
    },

		loginn: function(user) {
			return $http.post('http://localhost:8080/login', user)
		},

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
	   return $http.delete('http://localhost:8080/api/users/' + id);
    }
  };

  return methods;
});
