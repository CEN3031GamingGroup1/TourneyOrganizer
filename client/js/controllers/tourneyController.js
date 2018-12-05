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
			const newDate = new Date(document.getElementById("year").value + '/' + document.getElementById("month").value + '/' + document.getElementById("day").value + ' ' + document.getElementById("time").value);
			var address = $scope.street+' '+$scope.city+', '+$scope.state+' '+$scope.zip;
			console.log(newDate);
			var newTourney = {
				tournamentName: $scope.tournamentName,
				game: $scope.game,
				tournamentDate: newDate,
				host: $scope.loggedInUser.username,
				address: address,
				details: $scope.details,
				fee: $scope.fee,
				featured: 0,
				ageReq: $scope.ageReq
			};
			Tourneys.create(newTourney).then(function (response) {
				alert('Event Created :)');
				location.href="/home";
			}, function (err) {
				console.log('Could not create new tourney:', err);
				alert("something went wrong");
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
			if(tourney.featured == 1)
				tourney.featured = 0;
			else
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
				console.log($scope.getAge(userInfo.loggedInUser))
				if($scope.getAge(userInfo.loggedInUser) < tourney.ageReq) {
					alert("You are not old enough for this tournament");
					return;
				}
				if(userInfo.loggedInUser.attending.findIndex(x => x._id === tourney._id) != -1) {
					alert("You are already attending this tournament.");
					return;
				}
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

		$scope.unattend = function(tourney) {
			if(userInfo.loggedInUser != undefined) {
				console.log(userInfo.loggedInUser);
				var idx = userInfo.loggedInUser.attending.findIndex(t => t._id === tourney._id);
				userInfo.loggedInUser.attending.splice(idx, 1);
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
			return newDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"});
		}
	}
]);
