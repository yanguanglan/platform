(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['authService', '$rootScope', '$location'];

    function NavigationController(authService, $rootScope, $location) {
        var navCtl = this;
        navCtl.user = authService.isLoggedIn();
        navCtl.logout = function() {
            authService.logout();
            navCtl.user = authService.isLoggedIn();
            $location.path('/');
        };

        $rootScope.$on('login', function() {
            navCtl.user = authService.isLoggedIn();
        });
    }
})();
