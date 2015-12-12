(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('themeService', themeService);

	themeService.$inject = ['$http', '$location'];

	function themeService($http, $location) {
		var service = {
			all: all,
			vote: vote
		};

		return service;

		function all() {
			return $http
				.get('api/themes')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function vote(theme_id) {
			return $http
				.post('api/themes-vote', {
					theme_id: theme_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}
	}
})();
