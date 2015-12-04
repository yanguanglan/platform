(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = ['authService', '$auth', '$rootScope', '$location'];

	function NavigationController(authService, $auth, $rootScope, $location) {
		var navCtl = this;
		navCtl.user = authService.isLoggedIn();
		navCtl.logout = function() {
			$auth
				.logout()
				.then(function() {
					authService.logout();
					navCtl.user = null;
				});
		};
		navCtl.isAuthenticated = function() {
			return $auth.isAuthenticated();
		};

		$rootScope.$on('login', function(event, data) {
			navCtl.user = data;
		});
	}
})();
