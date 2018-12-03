angular.module('tourneys').controller('TourneyController', ['$scope', '$cookies', 'Tourneys',
function($scope, $cookies, Tourneys) {

	/* Get all the tourneys, then bind it to the scope */
	Tourneys.getAll().then(function(response) {
		$scope.tourneys = response.data;
		// .map(tourney => {
		// 	var newTourney = Object.assign({}, tourney);
		// 	const newDate = new Date(tourney.tournamentDate.year, tourney.tournamentDate.month-1, tourney.tournamentDate.day);
		// 	newTourney.tournamentDate = newDate;
		// 	return newTourney;
		// });
		console.log(response.data);
	}, function(error) {
		console.log('Unable to retrieve listings:', error);
	});

	$scope.detailedInfo = undefined;

	$scope.createTourney = function() {
		/*  TODO
		*Save the article using the Listings factory. If the object is successfully
		saved redirect back to the list page. Otherwise, display the error

		$scope.listingain
			}, function(error) {
				console.log('Unable to retrieve tourneys:', error);
			});
		}, function(err) {
			console.log('Could not create new tourney:', err);
		});
	};
<<<<<<< HEAD*/

	$scope.deleteTourney = function(index) {
		/**TODO
		Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
		*/
		Tourneys.delete($scope.tourneys[index]._id).then(function(response) {
			/**TODO
			Delete the article using the Listings factory. If the removal is successful,
			navigate back to 'listing.list'. Otherwise, display the error.
			*/
			Tourneys.getAll().then(function(response) {
				$scope.tourneys = response.data; //"redirecting" or updating the table again
			}, function(error) {
				console.log('Unable to retrieve tourney:', error);
			});
		}, function(err) {
			console.log('Could not delete tourney:', err);
		})
	};

	$scope.featureTourney = function(index) {
		$scope.tourneys[index].featured = 1;
		Tourneys.update($scope.tourneys[index]).then(function(response) {
			Tourneys.getAll().then(function(response) {
				$scope.tourneys = response.data; //"redirecting" or updating the table again
			}, function(error) {
				console.log('Unable to retrieve tourney:', error);
			});
		}, function(err) {
			console.log('Could not delete tourney:', err);
		})
	};

	$scope.showDetails = function(tourney) {
		$scope.detailedInfo = tourney;

	$scope.sendCookies = function(id) {
		$cookies.put('id', id);
	};

	$scope.getCookies = function() {
		console.log($cookies.get('id'));
		return $cookies.get('id');
	};


	$scope.displayDate = function(tourney) {
		var newDate = new Date;
		try {
			newDate = new Date(tourney.tournamentDate);
		}
		catch(err) {
			return '';
		}
		return newDate.toLocaleDateString();
	}

}
]);