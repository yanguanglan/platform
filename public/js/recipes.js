angular
	.module('recipesApp')
	.directive('mixpanel', function() {
		var linkFunction = function(scope, element, args) {
			element.on('click', function() {
				mixpanel.track(args.mixpanel);
			});
		};

		return {
			restrict: 'A',
			link: linkFunction
		};
	})
	.directive('scroller', function() {
		var linkFunction = function(scope, element, args) {
			element.on('click', function(e) {
				e.preventDefault();

				var $link = $(this).attr('href'),
					$top = $($link).offset().top - $('.navbar-fixed').outerHeight();

				$('html, body').animate({
					scrollTop: $top
				}, 400);
			});
		};

		return {
			restrict: 'A',
			link: linkFunction
		};
	})
	.directive('activeMenu', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				var activeClass = args.activeMenu || 'active',
					links = element.find('li');

				scope.$on('$routeChangeStart', function() {
					var path = $location.path();
					links.removeClass(activeClass);

					for (var i = 0, len = links.length; i < len; i++) {
						var listItem = angular.element(links[i]),
							href = listItem.find('a').attr('href').replace(/!|#/g, '');
						if (href == path) {
							listItem.addClass(activeClass);
						}
					}
				});
			}
		};
	}])
	.directive('recipe', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/partials/recipes/recipe.html'
		}
	})
	.directive('recipeItem', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/partials/recipes/recipe-item.html'
		}
	})
	.directive('serie', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/partials/series/serie.html'
		}
	})
	.directive('codepen', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/partials/recipes/codepen.html',
			scope: {
				recipe: '=recipe'
			}
		}
	})
	.filter('offset', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		}
	})
	.filter('dateToISO', function() {
		return function(input) {
			input = new Date(input).toISOString();
			return input;
		};
	});
