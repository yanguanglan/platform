(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$auth', '$location', '$rootScope', '$scope'];

	function LoginController(authService, $auth, $location, $rootScope, $scope) {
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
					.then(function(res) {
						var data = res.data;

						if (data.error) {
							console.log(data.msg);
						} else {
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/');
						}
					}, function(err) {
						console.log(err);
					});
			} else {
				$scope.loginForm.email.$setDirty();
				$scope.loginForm.password.$setDirty();
			}
		};
		loginCtl.socialLogin = function() {
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
