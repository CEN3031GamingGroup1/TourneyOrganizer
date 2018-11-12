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
	ageReq : $scope.ageReq
};
Tourneys.create(newTourney).then(function(response){
	$scope.tourneys = response.data;
}, function(error) {
	console.log('Unable to add tourneys:', error);
});
};

$scope.deleteTourney = function(index) {
	/**TODO
	Delete the article using the Listings factory. If the removal is successful,
	navigate back to 'listing.list'. Otherwise, display the error.
	*/

	$scope.tourneys.splice(index, 1);
	Tourneys.delete($scope.tourneys[index]._id).then(function(response){
		$scope.tourneys = response.data;
		console.log('Unable to delete listings:', error);
	});
};





$scope.showDetails = function(index) {
	$scope.detailedInfo = $scope.tourneys[index];
};
}
]);
