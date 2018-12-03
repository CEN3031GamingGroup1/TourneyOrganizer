angular.module('users').controller('UserController', ['$scope', 'Users',
function($scope, Users) {


	/* Get all the users, then bind it to the scope */
	Users.getAll().then(function(response) {
		$scope.users = response.data;
	}, function(error) {
		console.log('Unable to retrieve users:', error);
	});

	$scope.detailedInfo = undefined;
	$scope.loggedInUser = undefined;
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
<<<<<<< HEAD
	});
=======
});
*/
const newDate = new Date($scope.year, $scope.month-1, $scope.day);

var confirm_password = document.getElementById("confirm_password"), confirm_email = document.getElementById("confirm_email");
if(confirm_email.value == $scope.email && confirm_password.value == $scope.password) {
var newUser = {
	username : $scope.username,
	email : $scope.email,
	address : $scope.address,
	password: $scope.password,
	dob : newDate,
	admin: false
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
>>>>>>> authentication
	*/
		var confirm_password = document.getElementById("confirm_password"), confirm_email = document.getElementById("confirm_email");

		if (confirm_email.value == $scope.email && confirm_password.value == $scope.password) {
			var newUser = {
				username : $scope.username,
				email : $scope.email,
				address : $scope.address,
				password : $scope.password,
				dob : $scope.dob
			};
			Users.create(newUser).then(function(response){
				Users.getAll().then(function(response) {
					$scope.users = response.data; //"redirecting" or updating the table again

<<<<<<< HEAD
				}, function(error) {
					console.log('Unable to retrieve tourneys:', error);
				});
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

		Users.delete($scope.users[index]._id).then(function(response) {
			$scope.users = response.data;
			console.log('Unable to delete user:', error);
		});
	};

	$scope.showDetails = function(index) {
		$scope.detailedInfo = $scope.users[index];
	};
=======
$scope.login = function() {
	var newUser = {
		username: $scope.username,
		password: $scope.password
	}
	Users.loginn(newUser).then(function(response) {
		alert('Login Successful');
	}, function(err) {
		alert('Incorrect username or password');
	});
}

$scope.getLoggedInUser = function() {
	Users.getUsername().then(function(response) {
		console.log(response.data.username);
		Users.getUser(response.data.username).then(function(response) {
			$scope.loggedInUser = response.data[0];
			console.log(loggedInUser);
		}, function(error) {
			console.log(error);
		});
	}, function(error) {
		console.log(error);
	});
}

$scope.isLoggedIn = function() {
	Users.getUsername().then(function(response) {
		console.log(response);
		return true;
	}, function(error) {
		console.log(error);
		return false;
	});
}

$scope.displayDate = function(user) {
	var newDate = new Date;
	try {
		newDate = new Date(user.dob);
	}
	catch(err) {
		return '';
	}
	return newDate.toLocaleDateString();
}
>>>>>>> authentication

	// $scope.attendTourney = function() {
	// 	var attending = tourneys : $scope.
	// };
	
}
]);
