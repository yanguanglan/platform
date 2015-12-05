(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RecipeController', RecipeController);

	RecipeController.$inject = ['recipe', 'topics', 'authService', '$scope', 'recipeService'];

	function RecipeController(recipe, topics, authService, $scope, recipeService) {
		var recipeCtl = this;
		recipeCtl.recipe = recipe;
		recipeCtl.topics = topics;
		recipeCtl.auth = authService.isLoggedIn();
		recipeCtl.booked = recipeCtl.auth ? (recipeCtl.recipe.bookedArray.indexOf(recipeCtl.auth.id) > -1) : false;
		recipeCtl.liked = recipeCtl.auth ? (recipeCtl.recipe.likesArray.indexOf(recipeCtl.auth.id) > -1) : false;
		recipeCtl.toggleBook = function() {
			recipeCtl.booked = !recipeCtl.booked;

			if (recipeCtl.booked) {
				Materialize.toast('This recipe is now booked!', 5000);

				recipeService.book(recipeCtl.recipe.id);
			} else {
				Materialize.toast('This recipe is not booked anymore!', 5000);

				recipeService.unbook(recipeCtl.recipe.id);
			}
		};
		recipeCtl.toggleLike = function() {
			recipeCtl.liked = !recipeCtl.liked;

			if (recipeCtl.liked) {
				Materialize.toast('This recipe is now one of your favourites!', 5000);

				recipeService.like(recipeCtl.recipe.id);
			} else {
				Materialize.toast('This recipe is not one of your favourites anymore!', 5000);

				recipeService.dislike(recipeCtl.recipe.id);
			}
		};
		$scope.$watch(angular.bind(recipeCtl, function() {
			return recipeCtl.liked;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				var index = recipeCtl.recipe.likesArray.indexOf(recipeCtl.auth.id);
				if (index > -1) {
					recipeCtl.recipe.likesArray.splice(index, 1);
				} else {
					recipeCtl.recipe.likesArray.push(recipeCtl.auth.id);
				}
			}
		});
	}
})();
