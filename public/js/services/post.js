(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('postService', postService);

    postService.$inject = ['$http', '$location'];

    function postService($http, $location) {
        var service = {
            all: all,
            get: get
        };

        return service;

        function all(take) {
            var take = take || null;
            return $http
                .get('api/posts', {
                    params: {
                        take: take
                    }
                })
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }

        function get(uuid) {
            return $http
                .get('api/posts/' + uuid)
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }
    }
})();
