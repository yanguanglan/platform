(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('NotificationController', NotificationController);

	NotificationController.$inject = ['$rootScope'];

	function NotificationController($rootScope) {
		var notifyCtl = this;
		notifyCtl.modal = {
			title: "",
			content: "",
			btn: {
				title: "",
				href: ""
			}
		};

		$rootScope.$on('notification', function(event, data) {
			notifyCtl.modal = {
				title: data.title,
				content: data.content,
				btn: {
					title: data.btn.title,
					href: data.btn.href
				}
			};

			$('#notificationModal').openModal();
		});
	}
})();
