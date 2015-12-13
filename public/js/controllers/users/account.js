(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['authService', 'userService', '$rootScope', '$scope'];

	function AccountController(authService, userService, $rootScope, $scope) {
		var accountCtl = this;
		accountCtl.user = authService.isLoggedIn();
		accountCtl.submitProfile = function(isValid) {
			if (isValid) {
				userService
					.updateProfile(accountCtl.user.id, accountCtl.user.name, accountCtl.user.email)
					.then(function(data) {
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
				userService
					.updatePassword(accountCtl.user.id, accountCtl.user.password)
					.then(function(data) {
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
