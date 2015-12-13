(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['user', 'md5'];

	function DashboardController(user, md5) {
		var dashCtl = this;
		dashCtl.user = user.user;
		dashCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(dashCtl.user.email) + '&s=120';
	}
})();
