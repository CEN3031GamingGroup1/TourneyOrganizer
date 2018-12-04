angular.module('users', []).factory('Users', function ($http) {
	var methods = {
		getAll: function () {
			return $http.get('http://localhost:8080/api/users');
		},

		create: function(user) {
      return $http.post('http://localhost:8080/signup', user);
    },

		loginn: function(user) {
      return $http.post('http://localhost:8080/login', user);
		},

		update: function(id, user) {
      return $http.put('http://localhost:8080/api/users/'+ id, user);
		},

		getUsername: function() {
      return $http.get('http://localhost:8080/getUsername');
		},
		getUser: function(username) {
			return $http.get('http://localhost:8080/api/users/username/' + username, username);
		},
    delete: function(id) {
      return $http.delete('http://localhost:8080/api/users/' + id);
    }
  };
  return methods;
});
