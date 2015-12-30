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
			hello.init({
				github: 'f8f2e77b448821cc1ac5'
			});

			hello('github')
				.login({
					scope: 'name, email'
				})
				.then(function(data) {
					console.log(data);
					hello('github')
						.api('me')
						.then(function(json) {
							console.log(json);
							$auth
								.signup({
									name: json.name,
									email: json.email
								}, {
									params: {
										social: true
									}
								})
								.then(function(res) {
									var data = res.data;
									registerCtl.submitted = false;
									if (data.error) {
										console.log(data);
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
						}, function(e) {
							alert('Whoops! ' + e.error.message);
						});
				}, function(e) {
					alert('Signin error: ' + e.error.message);
				});
		};
	}
})();
