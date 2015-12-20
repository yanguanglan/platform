(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['authService', 'userService', '$rootScope', '$scope', 'md5'];

	function AccountController(authService, userService, $rootScope, $scope, md5) {
		var accountCtl = this;
		accountCtl.user = authService.isLoggedIn();
		accountCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(accountCtl.user.email) + '&s=120';
		accountCtl.submitted = false;
		accountCtl.submitProfile = function(isValid) {
			if (isValid) {
				accountCtl.submitted = true;
				userService
					.updateProfile(accountCtl.user.id, accountCtl.user.name, accountCtl.user.email)
					.then(function(data) {
						accountCtl.submitted = false;
						if (data.error) {

						} else {
							authService.setUser(data.data);
							$rootScope.$emit('update', data.data);
							Materialize.toast(accountCtl.user.name + ' your profile is updated!', 5000);
						}
					});
			} else {
				$scope.profileForm.name.$setDirty();
				$scope.profileForm.email.$setDirty();
			}
		};
		accountCtl.user.password = '';
		accountCtl.user.repeat_password = '';
		accountCtl.submitPassword = function(isValid) {
			if (isValid) {
				accountCtl.submitted = true;
				userService
					.updatePassword(accountCtl.user.id, accountCtl.user.password)
					.then(function(data) {
						accountCtl.submitted = false;
						if (data.error) {

						} else {
							Materialize.toast(accountCtl.user.name + ' your password is updated!', 5000);
							accountCtl.user.password = '';
							accountCtl.user.repeat_password = '';
							$scope.passwordForm.password.$setPristine();
							$scope.passwordForm.repeat_password.$setPristine();
						}
					});
			} else {
				$scope.passwordForm.password.$setDirty();
				$scope.passwordForm.repeat_password.$setDirty();
			}
		};
	}
})();
