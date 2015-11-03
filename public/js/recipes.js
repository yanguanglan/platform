var recipesApp = angular.module('recipesApp', ['ngRoute']);

recipesApp
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', {
                controller: 'HomeController as homeCtl',
                templateUrl: 'js/partials/coming.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('HomeController', [function() {
        var homeCtl = this;
    }])
    .directive('mixpanel', function() {
        var linkFunction = function(scope, element, args) {
            element.on('click', function() {
                mixpanel.track(args.mixpanel);
            });
        };

        return {
            restrict: 'A',
            link: linkFunction
        }
    });
