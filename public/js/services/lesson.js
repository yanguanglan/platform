(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('lessonService', lessonService);

    lessonService.$inject = ['$http', '$location'];

    function lessonService($http, $location) {
        var service = {
            get: get
        };

        return service;

        function get(uuid) {
            return $http
                .get('api/lessons/' + uuid)
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }
    }
})();
