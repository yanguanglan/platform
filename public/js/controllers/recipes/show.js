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
		recipeCtl.bookedMsg = recipeCtl.booked ? 'Bookmarked one!' : 'Not Bookmarked yet!';
		recipeCtl.liked = recipeCtl.auth ? (recipeCtl.recipe.likesArray.indexOf(recipeCtl.auth.id) > -1) : false;
		recipeCtl.likedMsg = recipeCtl.liked ? 'Favourited one!' : 'Not favourited yet!';
		recipeCtl.watched = recipeCtl.auth ? (recipeCtl.recipe.watchedArray.indexOf(recipeCtl.auth.id) > -1) : false;
		recipeCtl.watchedMsg = recipeCtl.watched ? 'Already visited!' : 'Not visited yet!';
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
			if (recipeCtl.auth) {
				recipeCtl.liked = !recipeCtl.liked;

				if (recipeCtl.liked) {
					Materialize.toast('This recipe is now one of your favourites!', 5000);
					recipeService.like(recipeCtl.recipe.id);
				} else {
					Materialize.toast('This recipe is not one of your favourites anymore!', 5000);
					recipeService.dislike(recipeCtl.recipe.id);
				}
			} else {
				$('#unsignedModal').openModal();
			}
		};
		$scope.$watch(angular.bind(recipeCtl, function() {
			return recipeCtl.liked;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				var index = recipeCtl.recipe.likesArray.indexOf(recipeCtl.auth.id);
				if (index > -1) {
					recipeCtl.recipe.likesArray.splice(index, 1);
					recipeCtl.likedMsg = 'Not favourited yet!';
				} else {
					recipeCtl.recipe.likesArray.push(recipeCtl.auth.id);
					recipeCtl.likedMsg = 'Favourited one!';
				}
			}

			angular.element('.tooltipped').tooltip('remove');
			setTimeout(function(){
				angular.element('.tooltipped').tooltip();
			}, 100);
		});
		$scope.$watch(angular.bind(recipeCtl, function() {
			return recipeCtl.booked;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				var index = recipeCtl.recipe.bookedArray.indexOf(recipeCtl.auth.id);
				if (index > -1) {
					recipeCtl.recipe.bookedArray.splice(index, 1);
					recipeCtl.bookedMsg = 'Not bookmarked yet!';
				} else {
					recipeCtl.recipe.bookedArray.push(recipeCtl.auth.id);
					recipeCtl.bookedMsg = 'Bookmarked one!';
				}
			}

			angular.element('.tooltipped').tooltip('remove');
			setTimeout(function(){
				angular.element('.tooltipped').tooltip();
			}, 100);
		});
	}
})();
