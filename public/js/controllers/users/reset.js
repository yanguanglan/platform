(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('ResetController', ResetController);

	ResetController.$inject = ['userService', '$scope', '$routeParams', '$location'];

	function ResetController(userService, $scope, $routeParams, $location) {
		var resetCtl = this;
		resetCtl.user = {
			password: '',
			repeat_password: ''
		};
		resetCtl.submit = function(isValid) {
			if (isValid) {
				userService
					.resetPassword($routeParams.uuid, $routeParams.token, resetCtl.user.password)
					.then(function(data) {
						if (data.data.error) {
							Materialize.toast(data.data.msg, 5000);
						} else {
							Materialize.toast(data.data.user.name + ' your password is updated!', 5000);
							$location.path('/login');
						}
					});
			} else {
				$scope.resetForm.password.$setDirty();
				$scope.resetForm.repeat_password.$setDirty();
			}
		};
	}
})();
