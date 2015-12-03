(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('authService', authService);

    authService.$inject = ['$location'];

    function authService($http, $location) {
        var user, service = {
            setUser: setUser,
            isLoggedIn: isLoggedIn
        };

        return service;

        function setUser() {
            user = {
                name: 'John Doe',
                username: 'john',
                email: 'john@gmail.com'
            };
        }

        function isLoggedIn() {
            return user ? user : false;
        }
    }
})();
