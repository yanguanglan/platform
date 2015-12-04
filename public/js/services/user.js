(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('userService', userService);

    userService.$inject = ['$http', '$location'];

    function userService($http, $location) {
        var service = {
            account: account,
            dashboard: dashboard
        };

        return service;

        function account() {
            var sortBy = sortBy || 'date',
                versionBy = versionBy || 'all';

            return $http
                .get('api/users/account')
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    if (err.data.error) {
                        $location.path('/login');
                    } else {
                        $location.path('/error');
                    }
                    console.log(err);
                });
        }

        function dashboard() {
            var views = views || null;
            return $http
                .get('api/users/dashboard')
                .then(function(data) {
                    console.log(data.data);
                    return data.data;
                }, function(err) {
                    if (err.data.error) {
                        $location.path('/login');
                    } else {
                        $location.path('/error');
                    }
                    console.log(err);
                });
        }
    }
})();
