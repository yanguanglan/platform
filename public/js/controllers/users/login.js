(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$auth', '$location', '$rootScope', '$scope', '$http', '$window'];

	function LoginController(authService, $auth, $location, $rootScope, $scope, $http, $window) {
		var loginCtl = this;
		loginCtl.user = {
			email: '',
			password: ''
		};
		loginCtl.submitted = false;
		loginCtl.submit = function(valid) {
			if (valid) {
				loginCtl.submitted = true;
				$auth
					.login({
						email: loginCtl.user.email,
						password: loginCtl.user.password
					})
					.then(function(res) {
						var data = res.data;
						loginCtl.submitted = false;
						if (data.error) {
							$rootScope.$emit('notification', {
								title: 'Login Failed',
								content: data.msg,
								btn: {
									title: null,
									href: null
								}
							});
						} else {
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/');
						}
					}, function(err) {
						loginCtl.submitted = false;
						$rootScope.$emit('notification', {
							title: 'Login Failed',
							content: err.data.msg,
							btn: {
								title: null,
								href: null
							}
						});
					});
			} else {
				$scope.loginForm.email.$setDirty();
				$scope.loginForm.password.$setDirty();
			}
		};
		loginCtl.socialLogin = function() {
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
								.login({
									email: json.email
								}, {
									params: {
										social: true
									}
								})
								.then(function(res) {
									console.log(res);
									var data = res.data;
									loginCtl.submitted = false;
									if (data.error) {
										console.log(data.msg);
										$rootScope.$emit('notification', {
											title: 'Login Failed',
											content: res.data.msg,
											btn: {
												title: null,
												href: null
											}
										});
									} else {
										$rootScope.$emit('update', data.user);
										authService.setUser(data.user);
										$location.path('/');
									}
								}, function(err) {
									loginCtl.submitted = false;
									console.log(err);
									$rootScope.$emit('notification', {
										title: 'Login Failed',
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
								content: 'We feel sorry but our servers could get your credentials and sign you in. Please try a bit later or submit an issue!',
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
