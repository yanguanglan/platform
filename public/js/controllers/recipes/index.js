(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RecipesController', RecipesController);

	RecipesController.$inject = ['$scope', 'filterFilter', 'recipes', 'topics', 'recipeService', '$window'];

	function RecipesController($scope, filterFilter, recipes, topics, recipeService, $window) {
		var recipesCtl = this;
		recipesCtl.recipes = recipes;
		recipesCtl.topics = topics;
		recipesCtl.showSearchForm = false;
		recipesCtl.listAppearance = window.innerWidth < 890 ? true : false;
		recipesCtl.searchFilter = '';
		recipesCtl.sortByType = 'date';
		recipesCtl.pageItems = 10;
		recipesCtl.currentPage = 0;
		recipesCtl.v1 = true;
		recipesCtl.v2 = true;
		recipesCtl.version = 'all';
		recipesCtl.toggleAppearance = function(listAppearance) {
			recipesCtl.listAppearance = listAppearance;
		};
		recipesCtl.toggleVersion = function() {
			var v1 = recipesCtl.v1,
				v2 = recipesCtl.v2,
				version;
			if (v1 && v2) {
				version = 'all';
			} else if (v1) {
				version = 1;
			} else if (v2) {
				version = 2;
			} else {
				version = 'none';
			}

			recipesCtl.version = version;

			recipeService.all(recipesCtl.sortByType, version).then(function(data) {
				recipesCtl.recipes = data;
			});
		};
		recipesCtl.toggleSearchForm = function() {
			recipesCtl.searchFilter = '';
			recipesCtl.showSearchForm = !recipesCtl.showSearchForm;
		};
		recipesCtl.clearSearch = function() {
			recipesCtl.searchFilter = '';
		};
		recipesCtl.range = function(min, max, step) {
			step = (step == undefined) ? 1 : step;
			var input = [],
				i = min;
			while (i <= max) {
				input.push(i);
				i += step;
			}
			return input;
		};
		recipesCtl.stepDown = function() {
			if (recipesCtl.currentPage > 0) {
				recipesCtl.currentPage -= 1;
			}

			return recipesCtl.currentPage;
		};
		recipesCtl.step = function(n) {
			if (recipesCtl.currentPage != n - 1) {
				recipesCtl.currentPage = n - 1;
			}

			return recipesCtl.currentPage;
		};
		recipesCtl.stepUp = function() {
			if (recipesCtl.currentPage < (recipesCtl.pagesNumber - 1)) {
				recipesCtl.currentPage += 1;
			}
			return recipesCtl.currentPage;
		};
		recipesCtl.previousPageDisabled = function() {
			return recipesCtl.currentPage === 0 ? 'disabled' : null;
		};
		recipesCtl.nextPageDisabled = function() {
			return recipesCtl.currentPage === recipesCtl.pagesNumber - 1 ? 'disabled' : null;
		};

		recipesCtl.sortBy = function(type) {
			if (type == 'date' || type == 'views' || type == 'likes') {
				recipesCtl.sortByType = type;
				recipeService.all(type, recipesCtl.version).then(function(data) {
					recipesCtl.recipes = data;
				});
			}
		};

		$(window).resize(function() {
			$scope.$apply(function() {
				if (window.innerWidth < 890) {
					recipesCtl.listAppearance = true;
				}
			});
		});

		$scope.$watch(angular.bind(recipesCtl, function() {
			return recipesCtl.recipes;
		}), function(newVal, oldVal) {
			if (!angular.equals(newVal, recipesCtl.filteredRecipes)) {
				recipesCtl.filteredRecipes = filterFilter(newVal, recipesCtl.searchFilter);
				recipesCtl.pagesNumber = Math.ceil(recipesCtl.filteredRecipes.length / recipesCtl.pageItems);
			}
		});

		$scope.$watch(angular.bind(recipesCtl, function() {
			return recipesCtl.searchFilter;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				recipesCtl.filteredRecipes = filterFilter(recipesCtl.recipes, newVal);
				recipesCtl.pagesNumber = Math.ceil(recipesCtl.filteredRecipes.length / recipesCtl.pageItems);
			}
		});
	}
})();
