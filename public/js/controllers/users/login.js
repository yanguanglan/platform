(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$location', '$rootScope'];

	function LoginController(authService, $location, $rootScope) {
		var loginCtl = this;
		loginCtl.user = {
			email: '',
			password: ''
		};
		loginCtl.submit = function(valid) {
			authService.setUser();
			$rootScope.$emit('login');
			$location.path('/');

			if (valid) {
				console.log('valid');
			} else {
				console.log('invalid');
			}
		};
	}
})();
