(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('userService', userService);

	userService.$inject = ['$http', '$location'];

	function userService($http, $location) {
		var service = {
			account: account,
			dashboard: dashboard,
			updateProfile: updateProfile,
			updatePassword: updatePassword,
			requestPassword: requestPassword,
			resetPassword: resetPassword
		};

		return service;

		function account() {
			var sortBy = sortBy || 'date',
				versionBy = versionBy || 'all';

			return $http
				.get('api/users/account')
				.then(function(data) {
					return data.data;
				}, function(err) {
					if (err.data.error) {
						$location.path('/login');
					} else {
						$location.path('/error');
					}
					console.log(err);
				});
		}

		function dashboard() {
			var views = views || null;
			return $http
				.get('api/users/dashboard')
				.then(function(data) {
					return data.data;
				}, function(err) {
					if (err.data.error) {
						$location.path('/login');
					} else {
						$location.path('/error');
					}
					console.log(err);
				});
		}

		function updateProfile(id, name, email) {
			return $http
				.put('api/users/' + id, {
					name: name,
					email: email
				});
		}

		function updatePassword(id, password) {
			return $http
				.put('api/users/update/password/' + id, {
					password: password
				});
		}

		function requestPassword(email) {
			return $http
				.post('api/users/request/password', {
					email: email
				});
		}

		function resetPassword(uuid, token, password) {
			return $http
				.put('api/users/reset/password', {
					uuid: uuid,
					token: token,
					password: password
				});
		}
	}
})();
