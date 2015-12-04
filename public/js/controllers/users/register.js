(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['authService', '$auth', '$scope', '$rootScope', '$location'];

	function RegisterController(authService, $auth, $scope, $rootScope, $location) {
		var registerCtl = this;
		registerCtl.user = {
			name: '',
			email: '',
			password: ''
		};
		registerCtl.submit = function(valid) {
			if (valid) {
				$auth
					.signup({
						name: registerCtl.user.name,
						email: registerCtl.user.email,
						password: registerCtl.user.password
					})
					.then(function(data) {
						$auth.setToken(data.data.token)
						$rootScope.$emit('login', data.data.user);
						authService.setUser(data.data.user);
						$location.path('/dashboard');
					}, function(err) {
						console.log(err);
					});
			} else {
				$scope.registerForm.name.$setDirty();
				$scope.registerForm.email.$setDirty();
				$scope.registerForm.password.$setDirty();
			}
		};
	}
})();
