(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('ForgotController', ForgotController);

	ForgotController.$inject = ['authService', '$auth', '$location', '$rootScope', '$scope'];

	function ForgotController(authService, $auth, $location, $rootScope, $scope) {
		var forgotCtl = this;
		forgotCtl.user = {
			email: ''
		};
		forgotCtl.submit = function(valid) {
			if (valid) {
                Materialize.toast('An email was sent please follow the procedure!', 5000);
			} else {
				$scope.forgotForm.email.$setDirty();
			}
		};
	}
})();
