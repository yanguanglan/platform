(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('MyRecipesController', MyRecipesController);

	MyRecipesController.$inject = ['authService', 'md5', '$scope', 'recipeService', 'topics'];

	function MyRecipesController(authService, md5, $scope, recipeService, topics) {
		var myRecipesCtl = this;
		myRecipesCtl.topics = topics;
		myRecipesCtl.user = authService.isLoggedIn();
		myRecipesCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(myRecipesCtl.user.email) + '&s=120';
		myRecipesCtl.recipe = {
			title: '',
			content: '',
			release: 'AngularJS 1',
			version: '',
			topics: ''
		};
		myRecipesCtl.releases = ['AngularJS 1', 'AngularJS 2'];
		myRecipesCtl.submitted = false;
		myRecipesCtl.submitRecipe = function(isValid) {
            console.log(myRecipesCtl.recipe);
			if (isValid) {
				myRecipesCtl.submitted = true;

				recipeService
					.create({
						user_id: myRecipesCtl.user.id,
						title: myRecipesCtl.recipe.title,
						content: myRecipesCtl.recipe.content,
						release: myRecipesCtl.recipe.release,
						version: myRecipesCtl.recipe.version,
						topics: myRecipesCtl.recipe.topics
					})
					.then(function(data) {
						myRecipesCtl.submitted = false;

						if (data.error) {
							Materialize.toast('Please enter valid data!', 5000);
						} else {
							Materialize.toast(myRecipesCtl.user.name + ' your recipe is saved, we will publish it after some quick review!', 5000);

							myRecipesCtl.recipe = {
								title: '',
								content: '',
								release: 'AngularJS 1',
								version: ''
							};

							$scope.newRecipeForm.title.$setPristine();
							$scope.newRecipeForm.content.$setPristine();
							$scope.newRecipeForm.version.$setPristine();
							$scope.newRecipeForm.release.$setPristine();

							// Reset textarea autogrow effect
							angular.element('.materialize-textarea').css('height', '3rem');
						}
					}, function(err) {

					});
			} else {
				$scope.newRecipeForm.title.$setDirty();
				$scope.newRecipeForm.content.$setDirty();
				$scope.newRecipeForm.version.$setDirty();
				$scope.newRecipeForm.release.$setDirty();
			}
		};

		$scope.$watch(angular.bind(myRecipesCtl, function() {
			return myRecipesCtl.recipe.release;
		}), function(newVal, oldVal) {
			if (newVal == 'AngularJS 1') {
				myRecipesCtl.versions = ['1.2.x', '1.4.x', '1.5.x'];
				myRecipesCtl.recipe.version = '1.4.x';
			} else {
				myRecipesCtl.versions = ['2.0.0-beta'];
				myRecipesCtl.recipe.version = '2.0.0-beta';
			}
		});
	}

})();
