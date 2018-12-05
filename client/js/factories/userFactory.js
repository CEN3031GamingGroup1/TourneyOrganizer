angular.module('users', []).factory('Users', function ($http) {
	var methods = {
		getAll: function () {
			return $http.get('/api/users');
		},

		create: function(user) {
      return $http.post('/signup', user);
    },

		loginn: function(user) {
      return $http.post('/login', user);
		},

		update: function(id, user) {
      return $http.put('/api/users/'+ id, user);
		},

		getUsername: function() {
      return $http.get('/getUsername');
		},
		getUser: function(username) {
			return $http.get('/api/users/username/' + username, username);
		},
    delete: function(id) {
      return $http.delete('/api/users/' + id);
    }
  };
  return methods;
});
