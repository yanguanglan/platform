(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('serieService', serieService);

	serieService.$inject = ['$http', '$location'];

	function serieService($http, $location) {
		var service = {
			all: all,
			get: get,
			latest: latest,
			like: like,
			dislike: dislike,
			book: book,
			unbook: unbook
		};

		return service;

		function all(sortBy, versionBy) {
			var sortBy = sortBy || 'date',
				versionBy = versionBy || 'all';

			return $http
				.get('api/series', {
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

		function get(uuid, views) {
			var views = views || null;

			return $http
				.get('api/series/' + uuid, {
					params: {
						views: views
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function latest() {
			return $http
				.get('api/series-latest')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function like(serie_id) {
			return $http
				.post('api/series-like', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function dislike(serie_id) {
			return $http
				.post('api/series-dislike', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function book(serie_id) {
			return $http
				.post('api/series-book', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function unbook(serie_id) {
			return $http
				.post('api/series-unbook', {
					serie_id: serie_id
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
