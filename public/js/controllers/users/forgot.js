(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('ForgotController', ForgotController);

	ForgotController.$inject = ['userService'];

	function ForgotController(userService) {
		var forgotCtl = this;
		forgotCtl.user = {
			email: ''
		};
		forgotCtl.submit = function(valid) {
			if (valid) {
				Materialize.toast('An email was sent please follow the procedure!', 5000);
				
				userService.requestPassword(forgotCtl.user.email);
			} else {
				$scope.forgotForm.email.$setDirty();
			}
		};
	}
})();
