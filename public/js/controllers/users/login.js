(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$auth', '$location', '$rootScope'];

	function LoginController(authService, $auth, $location, $rootScope) {
		var loginCtl = this;
		loginCtl.user = {
			email: '',
			password: ''
		};
		loginCtl.submit = function(valid) {
			if (valid) {
				$auth
					.login({
						email: loginCtl.user.email,
						password: loginCtl.user.password
					})
					.then(function(data) {
						$rootScope.$emit('login', data.data.user);
						authService.setUser(data.data.user);
						$location.path('/dashboard');
					}, function(err) {
						console.log(err);
					});
			} else {
				console.log('invalid');
			}
		};
	}
})();
