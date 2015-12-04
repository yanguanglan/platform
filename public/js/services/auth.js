(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('authService', authService);

	authService.$inject = ['$http', '$location'];

	function authService($http, $location) {
		var service = {
			duplicated: duplicated,
			setUser: setUser,
			isLoggedIn: isLoggedIn,
			logout: logout
		};

		return service;

		function duplicated(email) {
			return $http
				.get('api/auth/users-availability', {
					params: {
						email: email
					}
				});
		}

		function setUser(auth) {
			localStorage.setItem('user', JSON.stringify(auth));

			return auth;
		}

		function isLoggedIn() {
			var user = JSON.parse(localStorage.getItem('user'));

			return user ? user : false;
		}

		function logout() {
			localStorage.removeItem('user');
		}
	}
})();
