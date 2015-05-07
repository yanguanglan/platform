$(function () {
	App.init();
});

var App = {
	init: function () {
		$('.modal-trigger').leanModal();
		$('.parallax').parallax();
		$('.button-collapse').sideNav();
	}
};

var recipesApp = angular.module('recipesApp', ['ngMessages']);

recipesApp
	.controller('ContactController', ['$scope', '$http', function ($scope, $http) {
		$scope.loading = false;
		$scope.contact = {
			name: '',
			email: '',
			message: ''
		};
		$scope.submit = function(valid) {
			if (valid) {
				$http
					.post('contact', {
						name: $scope.contact.name,
						email: $scope.contact.email,
						message: $scope.contact.message
					})
					.success(function(data){
						if(data.error)
						{
							Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
						}
						else
						{
							Materialize.toast('<i class="mdi-action-done"></i> '+ $scope.contact.name + ', thank you!', 4000, 'green');
							$('#contactModal').closeModal();

							$scope.contact = {
								name: '',
								email: '',
								message: ''
							};
							$scope.contactForm.name.$setPristine();
							$scope.contactForm.email.$setPristine();
							$scope.contactForm.message.$setPristine();
						}
					})
					.error(function(){
						Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
					});
			}
			else {
				Materialize.toast('<i class="mdi-action-highlight-remove"></i> Please enter valid data!', 4000, 'custom-red');
				$scope.contactForm.name.$setDirty();
				$scope.contactForm.email.$setDirty();
				$scope.contactForm.message.$setDirty();
			}
		};
	}])
	.controller('RecipesController', ['$scope', '$http', function ($scope, $http) {
		$scope.loading = false;
		$scope.recipes = {
			name: '',
			email: ''
		};
		$scope.submit = function(valid) {
			if (valid) {
				$http
					.post('newsletter', {
						name: $scope.recipes.name,
						email: $scope.recipes.email
					})
					.success(function(data){
						if(data.error)
						{
							Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
						}
						else
						{
							Materialize.toast('<i class="mdi-action-done"></i> ' + $scope.recipes.name + ', thank you!', 4000, 'green');
							$('#recipeModal').closeModal();

							$scope.recipes = {
								name: '',
								email: ''
							};
							$scope.recipesForm.name.$setPristine();
							$scope.recipesForm.email.$setPristine();
						}
					})
					.error(function(){
						Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
					});
			}
			else {
				Materialize.toast('<i class="mdi-action-highlight-remove"></i> Please enter valid data!', 4000, 'custom-red');
				$scope.recipesForm.name.$setDirty();
				$scope.recipesForm.email.$setDirty();
			}
		};
	}])
	.directive('scroller', function(){
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				element.on('click', function (e) {
					e.preventDefault();

					var $link = $(this).attr('href'),
						$top = $($link).offset().top - $('.navbar-fixed').outerHeight();

					$('html, body').animate({
						scrollTop: $top
					}, 400);
				});
			}
		};
	});