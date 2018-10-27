angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {

    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
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
	 var newListing = {
		 trounamentName : $scope.tournamentName,
		 game : $scope.game,
		 address : $scope.address,
		 tournamentDate : scope.tournamentDate,
		 address : $scope.address,
		 fee : $scope.fee,
		 ageReq : $scope.ageReq
	 };
	  Listings.create(newListing).then(function(response){
		  $scope.listings = response.data;
	  }, function(error) {
		        console.log('Unable to add listings:', error);
	  });
	};

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */

	   		   $scope.listings.splice(index, 1);
	  Listings.delete($scope.listings[index]._id).then(function(response){
		  $scope.listings = response.data;
		        console.log('Unable to delete listings:', error);
	  });
	};



    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
