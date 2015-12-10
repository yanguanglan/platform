(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('FAQController', FAQController);

	FAQController.$inject = ['items', 'filterFilter', '$scope'];

	function FAQController(items, filterFilter, $scope) {
		var faqCtl = this;
		faqCtl.items = items;
		faqCtl.searchFilter = '';
		faqCtl.clearSearch = function() {
			faqCtl.searchFilter = '';
		};
		$scope.$watch(angular.bind(faqCtl, function() {
			return faqCtl.searchFilter;
		}), function(newVal, oldVal) {
			faqCtl.filteredItems = filterFilter(faqCtl.items, newVal);
		});
	}
})();
