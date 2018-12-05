angular.module('tourneys', []).factory('Tourneys', function ($http) {
	var methods = {
		getAll: function () {
			return $http.get('/api/tourneys');
		},

		create: function (tourney) {
			return $http.post('/api/tourneys', tourney);
		},

		update: function (tourney) {
			return $http.put('/api/tourneys/' + tourney._id, tourney);
		},

		delete: function (id) {
			return $http.delete('/api/tourneys/' + id);
		}
	};

	return methods;
});
