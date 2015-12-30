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
							console.log(data.msg);
						} else {
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/');
						}
					}, function(err) {
						loginCtl.submitted = false;
						console.log(err);
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
									} else {
										$rootScope.$emit('update', data.user);
										authService.setUser(data.user);
										$location.path('/');
									}
								}, function(err) {
									loginCtl.submitted = false;
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
