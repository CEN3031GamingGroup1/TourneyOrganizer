angular.module('tourneys').controller('TourneyController', ['$scope', 'Tourneys',
function($scope, Tourneys) {

	/* Get all the listings, then bind it to the scope */
	Tourneys.getAll().then(function(response) {
		$scope.tourneys = response.data;
	}, function(error) {
		console.log('Unable to retrieve listings:', error);
	});

	$scope.detailedInfo = undefined;

	$scope.createTourney = function() {
		/*  TODO
		*Save the article using the Listings factory. If the object is successfully
		saved redirect back to the list page. Otherwise, display the error

		$scope.listings.push($scope.newListing);
		$scope.newListing = {};
		Listings.create($scope.listings.listings).then(function(response){
		$scope.listings = response.data;
	}, function(error) {
	console.log('Unable to create listings:', error);
});
*/
var newTourney = {
	tournamentName : $scope.tournamentName,
	game : $scope.game,
	address : $scope.address,
	tournamentDate : $scope.tournamentDate,
	day : $scope.day,
	month : $scope.month,
	year : $scope.year,
	address : $scope.address,
	details: $scope.details,
	fee : $scope.fee,
	featured : 0,
	ageReq : $scope.ageReq
};
Tourneys.create(newTourney).then(function(response){
	Tourneys.getAll().then(function(response) {
		$scope.tourneys = response.data; //"redirecting" or updating the table again

	}, function(error) {
		console.log('Unable to retrieve tourneys:', error);
	});
}, function(err) {
	console.log('Could not create new tourney:', err);
});
};

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

$scope.showDetails = function(index) {
	$scope.detailedInfo = $scope.tourneys[index];
};
}
]);
