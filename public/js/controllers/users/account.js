(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['authService'];

	function AccountController(authService) {
		var accountCtl = this;
		accountCtl.user = authService.isLoggedIn();
	}
})();
