(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$location'];

	function LoginController(authService, $location) {
		var loginCtl = this;
		loginCtl.user = {
			email: '',
			password: ''
		};
		loginCtl.submit = function(valid) {
			authService.setUser();
			$location.path('/');

			// if (valid) {
			// 	console.log('valid');
			// } else {
			// 	console.log('invalid');
			// }
		};
	}
})();
