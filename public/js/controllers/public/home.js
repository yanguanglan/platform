(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['recipes', 'series'];

    function HomeController(recipes, series) {
        var homeCtl = this;
		homeCtl.recipes = recipes;
		homeCtl.series = series;
    }
})();
