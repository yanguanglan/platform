(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('SeriesController', SeriesController);

    SeriesController.$inject = ['$scope', 'filterFilter', 'series', 'serieService'];

    function SeriesController($scope, filterFilter, series, serieService) {
        var seriesCtl = this;
        seriesCtl.series = series;
        seriesCtl.showSearchForm = false;
        seriesCtl.searchFilter = '';
        seriesCtl.sortByType = 'date';
        seriesCtl.pageItems = 10;
        seriesCtl.currentPage = 0;
        seriesCtl.v1 = true;
        seriesCtl.v2 = true;
        seriesCtl.version = 'all';
        seriesCtl.toggleVersion = function() {
            var v1 = seriesCtl.v1,
                v2 = seriesCtl.v2,
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

            seriesCtl.version = version;

            serieService.all(seriesCtl.sortByType, seriesCtl.version).then(function(data) {
                seriesCtl.series = data;
            });
        };
        seriesCtl.toggleSearchForm = function() {
            seriesCtl.searchFilter = '';
            seriesCtl.showSearchForm = !seriesCtl.showSearchForm;
        };
        seriesCtl.clearSearch = function() {
            seriesCtl.searchFilter = '';
        };
        seriesCtl.range = function(min, max, step) {
            step = (step == undefined) ? 1 : step;
            var input = [],
                i = min;
            while (i <= max) {
                input.push(i);
                i += step;
            }
            return input;
        };
        seriesCtl.stepDown = function() {
            if (seriesCtl.currentPage > 0) {
                seriesCtl.currentPage -= 1;
            }

            return seriesCtl.currentPage;
        };
        seriesCtl.step = function(n) {
            if (seriesCtl.currentPage != n - 1) {
                seriesCtl.currentPage = n - 1;
            }

            return seriesCtl.currentPage;
        };
        seriesCtl.stepUp = function() {
            if (seriesCtl.currentPage < (seriesCtl.pagesNumber - 1)) {
                seriesCtl.currentPage += 1;
            }
            return seriesCtl.currentPage;
        };
        seriesCtl.previousPageDisabled = function() {
            return seriesCtl.currentPage === 0 ? 'disabled' : null;
        };
        seriesCtl.nextPageDisabled = function() {
            return seriesCtl.currentPage === seriesCtl.pagesNumber - 1 ? 'disabled' : null;
        };

        seriesCtl.sortBy = function(type) {
            if (type == 'date' || type == 'views' || type == 'likes') {
                seriesCtl.sortByType = type;
                serieService.all(seriesCtl.sortByType, seriesCtl.version).then(function(data) {
                    seriesCtl.series = data;
                });
            }
        };

        $scope.$watch(angular.bind(seriesCtl, function() {
            return seriesCtl.series;
        }), function(newVal, oldVal) {
            if (!angular.equals(newVal, seriesCtl.filteredSeries)) {
                seriesCtl.filteredSeries = filterFilter(newVal, seriesCtl.searchFilter);
                seriesCtl.pagesNumber = Math.ceil(seriesCtl.filteredSeries.length / seriesCtl.pageItems);
            }
        });

        $scope.$watch(angular.bind(seriesCtl, function() {
            return seriesCtl.searchFilter;
        }), function(newVal, oldVal) {
            if (newVal != oldVal) {
                seriesCtl.filteredSeries = filterFilter(seriesCtl.series, newVal);
                seriesCtl.pagesNumber = Math.ceil(seriesCtl.filteredSeries.length / seriesCtl.pageItems);
            }
        });
    }
})();
