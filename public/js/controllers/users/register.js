(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['authService', '$auth', '$scope', '$rootScope', '$location', '$window'];

	function RegisterController(authService, $auth, $scope, $rootScope, $location, $window) {
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
							$rootScope.$emit('notification', {
								title: 'Registration Failed',
								content: res.data.msg,
								btn: {
									title: null,
									href: null
								}
							});
						} else {
							$auth.setToken(data.token)
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/dashboard');
						}
					}, function(err) {
						registerCtl.submitted = false;
						console.log(err);
						$rootScope.$emit('notification', {
							title: 'Registration Failed',
							content: err.data.msg,
							btn: {
								title: null,
								href: null
							}
						});
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
				github: $window.recipes.GITHUB_CLIENT_ID
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
										$rootScope.$emit('notification', {
											title: 'Registration Failed',
											content: res.data.msg,
											btn: {
												title: null,
												href: null
											}
										});
									} else {
										$auth.setToken(data.token)
										$rootScope.$emit('update', data.user);
										authService.setUser(data.user);
										$location.path('/dashboard');
									}
								}, function(err) {
									registerCtl.submitted = false;
									console.log(err);
									$rootScope.$emit('notification', {
										title: 'Registration Failed',
										content: err.data.msg,
										btn: {
											title: null,
											href: null
										}
									});
								});
						}, function(e) {
							$rootScope.$emit('notification', {
								title: 'Server Error',
								content: 'We feel sorry but our servers could not establish communication with vendor\'s datacenter. Please try a bit later or submit an issue!',
								btn: {
									title: null,
									href: null
								}
							});
						});
				}, function(e) {
					$rootScope.$emit('notification', {
						title: 'Server Error',
						content: 'We feel sorry but our servers could not establish communication with vendor\'s datacenter. Please try a bit later or submit an issue!',
						btn: {
							title: null,
							href: null
						}
					});
				});
		};
	}
})();
