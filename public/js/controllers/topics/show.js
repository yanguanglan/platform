(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('TopicController', TopicController);

	TopicController.$inject = ['$scope', 'filterFilter', 'topic', 'topics', 'topicService'];

	function TopicController($scope, filterFilter, topic, topics, topicService) {
		var topicCtl = this;
		topicCtl.topic = topic;
		topicCtl.topics = topics;
		topicCtl.showSearchForm = false;
		topicCtl.listAppearance = true;
		topicCtl.searchFilter = '';
		topicCtl.sortByType = 'date';
		topicCtl.pageItems = 10;
		topicCtl.currentPage = 0;
		topicCtl.v1 = true;
		topicCtl.v2 = true;
		topicCtl.version = 'all';
		topicCtl.toggleAppearance = function(listAppearance) {
			topicCtl.listAppearance = listAppearance;
		};
		topicCtl.toggleVersion = function() {
			var v1 = topicCtl.v1,
				v2 = topicCtl.v2,
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

			topicCtl.version = version;

			topicService.get(topicCtl.topic.uuid, topicCtl.sortByType, topicCtl.version).then(function(data) {
				topicCtl.topic = data;
			});
		};
		topicCtl.toggleSearchForm = function() {
			topicCtl.searchFilter = '';
			topicCtl.showSearchForm = !topicCtl.showSearchForm;
		};
		topicCtl.clearSearch = function() {
			topicCtl.searchFilter = '';
		};
		topicCtl.range = function(min, max, step) {
			step = (step == undefined) ? 1 : step;
			var input = [],
				i = min;
			while (i <= max) {
				input.push(i);
				i += step;
			}
			return input;
		};
		topicCtl.stepDown = function() {
			if (topicCtl.currentPage > 0) {
				topicCtl.currentPage -= 1;
			}

			return topicCtl.currentPage;
		};
		topicCtl.step = function(n) {
			if (topicCtl.currentPage != n - 1) {
				topicCtl.currentPage = n - 1;
			}

			return topicCtl.currentPage;
		};
		topicCtl.stepUp = function() {
			if (topicCtl.currentPage < (topicCtl.pagesNumber - 1)) {
				topicCtl.currentPage += 1;
			}
			return topicCtl.currentPage;
		};
		topicCtl.previousPageDisabled = function() {
			return topicCtl.currentPage === 0 ? 'disabled' : null;
		};
		topicCtl.nextPageDisabled = function() {
			return topicCtl.currentPage === topicCtl.pagesNumber - 1 ? 'disabled' : null;
		};

		topicCtl.sortBy = function(type) {
			if (type == 'date' || type == 'views' || type == 'likes') {
				topicCtl.sortByType = type;
				topicService.get(topicCtl.topic.uuid, topicCtl.sortByType, topicCtl.version).then(function(data) {
					topicCtl.topic = data;
				});
			}
		};

		$scope.$watch(angular.bind(topicCtl, function() {
			return topicCtl.topic.recipes;
		}), function(newVal, oldVal) {
			if (!angular.equals(newVal, topicCtl.filteredRecipes)) {
				topicCtl.filteredRecipes = filterFilter(newVal, topicCtl.searchFilter);
				topicCtl.pagesNumber = Math.ceil(topicCtl.filteredRecipes.length / topicCtl.pageItems);
			}
		});

		$scope.$watch(angular.bind(topicCtl, function() {
			return topicCtl.searchFilter;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				topicCtl.filteredRecipes = filterFilter(topicCtl.topic.recipes, newVal);
				topicCtl.pagesNumber = Math.ceil(topicCtl.filteredRecipes.length / topicCtl.pageItems);
			}
		});
	}
})();
