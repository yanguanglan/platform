(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('UserController', UserController);

	UserController.$inject = ['authService'];

	function UserController(authService) {
		var userCtl = this;
		userCtl.user = authService.isLoggedIn();
	}
})();
