angular.module('tourneys')
.service('userInfo')
.controller('TourneyController', ['$scope', '$cookies', 'Tourneys', 'userInfo',
    function ($scope, $cookies, Tourneys, userInfo) {


		/* Get all the tourneys, then bind it to the scope */
		Tourneys.getAll().then(function (response) {
			$scope.tourneys = response.data;
		}, function (error) {
			console.log('Unable to retrieve listings:', error);
		});

		$scope.detailedInfo = undefined;

		$scope.createTourney = function () {
			const newDate = new Date($scope.tournamentDate.year, $scope.tournamentDate.month - 1, $scope.tournamentDate.day);
			var address = $scope.street+' '+$scope.city+', '+$scope.state+' '+$scope.zip;
			console.log(address);
			var newTourney = {
				tournamentName: $scope.tournamentName,
				game: $scope.game,
				tournamentDate: newDate,
				address: address,
				details: $scope.details,
				fee: $scope.fee,
				featured: 0,
				ageReq: $scope.ageReq
			};
			Tourneys.create(newTourney).then(function (response) {
				Tourneys.getAll().then(function (response) {
					$scope.tourneys = response.data;
					alert('Event Created :)');
			window.location.href='/home'; //"redirecting" or updating the table again
				}, function (error) {
					console.log('Unable to retrieve tourneys:', error);
				});
			}, function (err) {
				console.log('Could not create new tourney:', err);
			});
		};

		$scope.deleteTourney = function (tourney) {
			Tourneys.delete(tourney._id).then(function (response) {
				Tourneys.getAll().then(function (response) {
					$scope.tourneys = response.data; //"redirecting" or updating the table again
				}, function (error) {
					console.log('Unable to retrieve tourney:', error);
				});
			}, function (err) {
				console.log('Could not delete tourney:', err);
			})
		};

		$scope.featureTourney = function (tourney) {
			tourney.featured = 1;
			Tourneys.update(tourney).then(function (response) {
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
			if(userInfo.loggedInUser != undefined) {
				console.log(userInfo.loggedInUser);
				userInfo.loggedInUser.attending.push(tourney);
				console.log(userInfo.loggedInUser);
			}
			else {
				console.log("not logged in?");
				console.log(userInfo.loggedInUser);
				location.href='/login';
			}
		}

		$scope.toggleBoolean = function() {
		    if($scope.showHostTourneys)
		        $scope.showHostTourneys = false;
		    else
		        $scope.showHostTourneys = true;
		    console.log($scope.showHostTourneys);
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
