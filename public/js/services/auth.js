(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('authService', authService);

	authService.$inject = ['$http', '$location', '$auth'];

	function authService($http, $location, $auth) {
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

			return $auth.isAuthenticated() ? user : false;
		}

		function logout() {
			localStorage.removeItem('user');
		}
	}
})();
