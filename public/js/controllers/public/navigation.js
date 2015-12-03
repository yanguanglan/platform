(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = ['authService'];

	function NavigationController(authService) {
		var navCtl = this;
		navCtl.user = authService.isLoggedIn();
		console.log(navCtl.user);
	}
})();
