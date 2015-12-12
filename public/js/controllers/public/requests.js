(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RequestsController', RequestsController);

	RequestsController.$inject = ['themes', 'authService', 'themeService'];

	function RequestsController(themes, authService, themeService) {
		var requestsCtl = this;
		requestsCtl.themes = themes;
		requestsCtl.auth = authService.isLoggedIn();
		requestsCtl.vote = function(theme) {
			if (requestsCtl.auth) {
				var index = requestsCtl.themes.indexOf(theme);

				Materialize.toast('Theme "' + theme.title + '" is voted on your behalf!', 5000);

				themeService
					.vote(theme.id)
					.then(function(data) {
						requestsCtl.themes = data;
					});
			} else {
				$('#unsignedModal').openModal();
			}
		};
	}
})();
