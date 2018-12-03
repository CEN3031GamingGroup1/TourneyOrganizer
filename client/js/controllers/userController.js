angular.module('users').controller('UserController', ['$scope', 'Users',
	function ($scope, Users) {

		/* Get all the users, then bind it to the scope */
		Users.getAll().then(function (response) {
			$scope.users = response.data;
		}, function (error) {
			console.log('Unable to retrieve users:', error);
		});

		$scope.detailedInfo = undefined;

		$scope.createUser = function () {
			var confirm_password = document.getElementById("confirm_password"), confirm_email = document.getElementById("confirm_email");

			if (confirm_email.value == $scope.email && confirm_password.value == $scope.password) {
				var newUser = {
					username: $scope.username,
					email: $scope.email,
					address: $scope.address,
					password: $scope.password,
					dob: $scope.dob
				};
				Users.create(newUser).then(function (response) {
					Users.getAll().then(function (response) {
						$scope.users = response.data; //"redirecting" or updating the table again

					}, function (error) {
						console.log('Unable to retrieve tourneys:', error);
					});
				}, function (err) {
					console.log('Could not create new tourney:', err);
				});
			}
			else {
				console.log("email or password does not match");
			}
		};

		$scope.deleteUser = function (index) {
			$scope.users.splice(index, 1);

			Users.delete($scope.users[index]._id).then(function (response) {
				$scope.users = response.data;
				console.log('Unable to delete user:', error);
			});
		};

		$scope.showDetails = function (index) {
			$scope.detailedInfo = $scope.users[index];
		};

		// This is my attempt at writing a function to fill in the attendance attribute in user from tourney
		// $scope.attendTourney = function() {
		// 	var attending = tourneys : $scope.
		// };

	}
]);
