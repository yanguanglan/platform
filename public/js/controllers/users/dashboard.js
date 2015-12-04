(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['authService'];

	function DashboardController(authService) {
		var dashCtl = this;
		dashCtl.user = authService.isLoggedIn();
	}
})();
