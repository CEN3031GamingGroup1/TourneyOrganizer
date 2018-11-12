angular.module('users').controller('UserController', ['$scope', 'Users',
function($scope, users) {

	/* Get all the users, then bind it to the scope */
	Users.getAll().then(function(response) {
		$scope.users = response.data;
	}, function(error) {
		console.log('Unable to retrieve users:', error);
	});

	$scope.detailedInfo = undefined;

	$scope.createUser = function() {
		/*  TODO
		*Save the article using the users factory. If the object is successfully
		saved redirect back to the list page. Otherwise, display the error

		$scope.users.push($scope.newuser);
		$scope.newuser = {};
		users.create($scope.users.users).then(function(response){
		$scope.users = response.data;
	}, function(error) {
	console.log('Unable to create users:', error);
});
*/
var newuser = {
	Username : $scope.Username,
	email : $scope.email,
	address : $scope.address,
	password : scope.password,
	dob : $scope.dob
};
Users.create(newuser).then(function(response){
	$scope.users = response.data;
}, function(error) {
	console.log('Unable to add users:', error);
});
};

$scope.deleteUser = function(index) {
	/**TODO
	Delete the article using the users factory. If the removal is successful,
	navigate back to 'user.list'. Otherwise, display the error.
	*/

	$scope.users.splice(index, 1);
	Users.delete($scope.users[index]._id).then(function(response){
		$scope.users = response.data;
		console.log('Unable to delete user:', error);
	});
};





$scope.showDetails = function(index) {
	$scope.detailedInfo = $scope.users[index];
};
}
]);
