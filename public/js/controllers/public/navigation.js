(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = ['authService', '$auth', '$rootScope', '$location', 'md5'];

	function NavigationController(authService, $auth, $rootScope, $location, md5) {
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
		navCtl.gravatar = navCtl.user ? 'http://www.gravatar.com/avatar/' + md5.createHash(navCtl.user.email) + '&s=80' : null;
		navCtl.isAuthenticated = function() {
			return $auth.isAuthenticated();
		};

		$rootScope.$on('update', function(event, data) {
			navCtl.user = data;
			navCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(navCtl.user.email) + '&s=80';
		});
	}
})();
