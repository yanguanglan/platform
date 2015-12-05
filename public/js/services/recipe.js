(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('recipeService', recipeService);

	recipeService.$inject = ['$http', '$location'];

	function recipeService($http, $location) {
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
				.get('api/recipes', {
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
				.get('api/recipes/' + uuid, {
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
				.get('api/recipes-latest')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function like(recipe_id) {
			return $http
				.post('api/recipes-like', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function dislike(recipe_id) {
			return $http
				.post('api/recipes-dislike', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function book(recipe_id) {
			return $http
				.post('api/recipes-book', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function unbook(recipe_id) {
			return $http
				.post('api/recipes-unbook', {
					recipe_id: recipe_id
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
