angular.module('tourneys').controller('TourneyController', ['$scope', '$cookies', 'Tourneys',
	function ($scope, $cookies, Tourneys) {

		/* Get all the tourneys, then bind it to the scope */
		Tourneys.getAll().then(function (response) {
			$scope.tourneys = response.data;
			console.log(response.data);
		}, function (error) {
			console.log('Unable to retrieve listings:', error);
		});

		$scope.detailedInfo = undefined;

		$scope.createTourney = function () {
			const newDate = new Date($scope.tournamentDate.year, $scope.tournamentDate.month - 1, $scope.tournamentDate.day);

			var newTourney = {
				tournamentName: $scope.tournamentName,
				game: $scope.game,
				address: $scope.address,
				tournamentDate: newDate,
				address: $scope.address,
				details: $scope.details,
				fee: $scope.fee,
				featured: 0,
				ageReq: $scope.ageReq
			};
			Tourneys.create(newTourney).then(function (response) {
				Tourneys.getAll().then(function (response) {
					$scope.tourneys = response.data; //"redirecting" or updating the table again
				}, function (error) {
					console.log('Unable to retrieve tourneys:', error);
				});
			}, function (err) {
				console.log('Could not create new tourney:', err);
			});
		};

		$scope.deleteTourney = function (index) {
			Tourneys.delete($scope.tourneys[index]._id).then(function (response) {
				Tourneys.getAll().then(function (response) {
					$scope.tourneys = response.data; //"redirecting" or updating the table again
				}, function (error) {
					console.log('Unable to retrieve tourney:', error);
				});
			}, function (err) {
				console.log('Could not delete tourney:', err);
			})
		};

		$scope.featureTourney = function (index) {
			$scope.tourneys[index].featured = 1;
			Tourneys.update($scope.tourneys[index]).then(function (response) {
				Tourneys.getAll().then(function (response) {
					$scope.tourneys = response.data; //"redirecting" or updating the table again
				}, function (error) {
					console.log('Unable to retrieve tourney:', error);
				});
			}, function (err) {
				console.log('Could not delete tourney:', err);
			})
		};

		$scope.showDetails = function (tourney) {
			$scope.detailedInfo = tourney;
		};

$scope.attend = function(tourney) {
	console.log($scope.loggedInUser);
	$scope.loggedInUser.attending.push(tourney);
}


		$scope.sendCookies = function (id) {
			$cookies.put('id', id);
		};

		$scope.getCookies = function () {
			console.log($cookies.get('id'));
			return $cookies.get('id');
		};

		$scope.displayDate = function (tourney) {
			var newDate = new Date;
			try {
				newDate = new Date(tourney.tournamentDate);
			}
			catch (err) {
				return '';
			}
			return newDate.toLocaleDateString();
		}
	}
]);
