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
            latest: latest
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
    }
})();
