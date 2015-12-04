(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['user'];

	function DashboardController(user) {
		var dashCtl = this;
		dashCtl.user = user.user;
		console.log(dashCtl.user);
	}
})();
