(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['authService', 'userService', '$rootScope'];

	function AccountController(authService, userService, $rootScope) {
		var accountCtl = this;
		accountCtl.user = authService.isLoggedIn();
		accountCtl.submit = function(isValid) {
			if (isValid) {
				userService
					.update(accountCtl.user.id, accountCtl.user.name, accountCtl.user.email)
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
	}
})();
