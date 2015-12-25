(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('MyRecipesController', MyRecipesController);

	MyRecipesController.$inject = ['authService', 'md5', '$scope', 'recipeService'];

	function MyRecipesController(authService, md5, $scope, recipeService) {
		var myRecipesCtl = this;
		myRecipesCtl.user = authService.isLoggedIn();
		myRecipesCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(myRecipesCtl.user.email) + '&s=120';
		myRecipesCtl.recipe = {
			title: '',
			content: '',
			release: 'AngularJS 1',
			version: ''
		};
		myRecipesCtl.releases = ['AngularJS 1', 'AngularJS 2'];
		myRecipesCtl.submitted = false;
		myRecipesCtl.submitRecipe = function(isValid) {
			if (isValid) {
				myRecipesCtl.submitted = true;

				recipeService
					.create({
						user_id: myRecipesCtl.user.id,
						title: myRecipesCtl.recipe.title,
						content: myRecipesCtl.recipe.content,
						release: myRecipesCtl.recipe.release,
						version: myRecipesCtl.recipe.version
					})
					.then(function(data) {
						myRecipesCtl.submitted = false;

						console.log(data);
					})
			} else {
				$scope.newRecipeForm.title.$setDirty();
				$scope.newRecipeForm.content.$setDirty();
				$scope.newRecipeForm.version.$setDirty();
				$scope.newRecipeForm.release.$setDirty();
			}
		};
	}

})();
