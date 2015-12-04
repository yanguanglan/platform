(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('authService', authService);

    authService.$inject = ['$location'];

    function authService($http, $location) {
        var service = {
            setUser: setUser,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

        return service;

        function setUser(auth) {
            localStorage.setItem('user', JSON.stringify(auth));

            return auth;
        }

        function isLoggedIn() {
            var user = JSON.parse(localStorage.getItem('user'));

            return user ? user : false;
        }

        function logout() {
            localStorage.removeItem('user');
        }
    }
})();
