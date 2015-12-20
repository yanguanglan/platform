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
		registerCtl.submitted = false;
		registerCtl.submit = function(valid) {
			if (valid) {
				registerCtl.submitted = true;
				$auth
					.signup({
						name: registerCtl.user.name,
						email: registerCtl.user.email,
						password: registerCtl.user.password
					})
					.then(function(res) {
						var data = res.data;
						registerCtl.submitted = false;
						if (data.error) {
							console.log(data.msg);
						} else {
							$auth.setToken(data.token)
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/dashboard');
						}
					}, function(err) {
						registerCtl.submitted = false;
						console.log(err);
					});
			} else {
				$scope.registerForm.name.$setDirty();
				$scope.registerForm.email.$setDirty();
				$scope.registerForm.password.$setDirty();
			}
		};
		registerCtl.socialLogin = function() {
			console.log('github');

			$auth.authenticate('github')
				.then(function(response) {
					console.log(response);
				})
				.catch(function(response) {
					Materialize.toast('Oops, we couldn\'t get your email!', 5000);
				});
		};
	}
})();
