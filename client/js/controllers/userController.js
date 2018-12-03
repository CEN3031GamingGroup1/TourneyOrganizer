angular.module('users').controller('UserController', ['$scope', 'Users',
function($scope, Users) {

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
var confirm_password = document.getElementById("confirm_password"), confirm_email = document.getElementById("confirm_email");
if(confirm_email.value == $scope.email && confirm_password.value == $scope.password) {
var newUser = {
	username : $scope.username,
	email : $scope.email,
	address : $scope.address,
	password: $scope.password,
	dob : $scope.dob
};
Users.create(newUser).then(function(response){
}, function(err) {
	console.log('Could not create new tourney:', err);
});
}
else {
	console.log("email or password does not match");
}
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


$scope.login = function() {
	var newUser = {
		username: $scope.username,
		password: $scope.password
	}
	Users.loginn(newUser).then(function(response) {
		$window.location.href='/home';
	}, function(err) {
		alert('Incorrect username or password');
	});
}


$scope.showDetails = function(index) {
	$scope.detailedInfo = $scope.users[index];
};
}
]);
