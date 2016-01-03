(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('topicService', topicService);

	topicService.$inject = ['$http', '$location'];

	function topicService($http, $location) {
		var service = {
			all: all,
			get: get,
			list: list
		};

		return service;

		function all(versionBy) {
			var versionBy = versionBy || 'all';
			return $http
				.get('api/topics', {
					params: {
						versionBy: versionBy
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function get(uuid, sortBy, versionBy) {
			var sortBy = sortBy || 'date',
				versionBy = versionBy || 'all';

			return $http
				.get('api/topics/' + uuid, {
					params: {
						sortBy: sortBy,
						versionBy: versionBy
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function list() {
			return $http
				.get('api/topics-list')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}
	}
})();
