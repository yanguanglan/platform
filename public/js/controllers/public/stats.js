(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('StatsController', StatsController);

    StatsController.$inject = ['posts', 'recipes', 'topics'];

    function StatsController(posts, recipes, topics) {
        var statsCtl = this;
        statsCtl.posts = posts;
        statsCtl.recipes = recipes;
        statsCtl.topics = topics;
    }
})();
