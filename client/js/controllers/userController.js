angular.module('users')
.service('userInfo')
.controller('UserController', ['$scope', 'Users', 'userInfo',
function($scope, Users, userInfo) {



	/* Get all the users, then bind it to the scope */
	Users.getAll().then(function(response) {
		$scope.users = response.data;
	}, function(error) {
		console.log('Unable to retrieve users:', error);
	});

	$scope.detailedInfo = undefined;

	$scope.updateUser = function(user) {
		console.log("updating user");
		console.log(userInfo.loggedInUser);
		Users.update(user._id, user).then(function(response) {
			userInfo.loggedInUser = response.data;
			$scope.loggedInUser = userInfo.loggedInUser;
			console.log("updated user");
			console.log(userInfo.loggedInUser);
		}, function(err) {
			console.log(err);
		});
	}


	$scope.createUser = function() {

		Users.getAll().then(function(response) {
			$scope.users = response.data;
		}, function(error) {
			console.log('Unable to retrieve users:', error);
		});

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
const newDate = new Date($scope.year, $scope.month-1, $scope.day);

console.log(newDate);

var confirm_password = document.getElementById("confirm_password"), confirm_email = document.getElementById("confirm_email");
if(confirm_email.value == $scope.email && confirm_password.value == $scope.password) {
var newUser = {
	username : $scope.username,
	email : $scope.email,
	address : $scope.address,
	password: $scope.password,
	dob : newDate,
	attending: [],
	admin: false
};
console.log(newUser);
if($scope.users.findIndex(user => user.username === newUser.username) != -1 || $scope.users.findIndex(user => user.email === newUser.email) != -1) {
	alert("username or email is already in use.");
}
else {
Users.create(newUser).then(function(response) {
	alert("Success!");
	location.href='/home';
}, function(err) {
	console.log('Could not create new user:', err);
	alert("something went wrong");
	location.href='/signup';
});
}
}
else {
	alert("email or password does not match");
}
};

$scope.isLoggedIn = function() {
	Users.getUsername().then(function(response) {
		console.log(response);
		return true;
	}, function(error) {
		console.log(error);
		return false;
	});
}

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
	Users.loginn(newUser).then(function(response, err) {
		console.log(response.data);
		if(err || response.data == undefined || response.data == '') {
			console.log(err);
			alert('Incorrect username or password');
			window.location.href='/login';
		}
		else {
			alert('Successful login! Welcome, ' + response.data + '. :)');
			window.location.href='/home';
		}
	});
}

$scope.UFdup = function() {
	alert('🖕😂😝😡👌 That Sucks 🖕🍆💯🧐🅱️👏');
}

$scope.search = function(){
	alert('Nice Try, just press command+F (ctrl+F for Windows) ')
}

$scope.getLoggedInUser = function() {
	Users.getUsername().then(function(response) {
		console.log(response.data.username);
		Users.getUser(response.data.username).then(function(response) {
			userInfo.loggedInUser = response.data[0];
			$scope.loggedInUser = userInfo.loggedInUser;
			console.log($scope.loggedInUser);
		}, function(error) {
			console.log(error);
		});
	}, function(error) {
		console.log(error);
	});
}


$scope.toggleBoolean = function() {
    if($scope.showHostTourneys)
        $scope.showHostTourneys = false;
    else
        $scope.showHostTourneys = true;
    console.log($scope.showHostTourneys);
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

$scope.showDetails = function(index) {
	$scope.detailedInfo = $scope.users[index];
};
}
]);
