(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('RecipeController', RecipeController);

    RecipeController.$inject = ['recipe', 'topics'];

    function RecipeController(recipe, topics) {
        var recipeCtl = this;
        recipeCtl.recipe = recipe;
        recipeCtl.topics = topics;
    }
})();
