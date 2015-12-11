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
	.directive('faqFixed', function() {
		var linkFunction = function(scope, element, args) {
			if ($(window).scrollTop() > 150) {
				element.addClass('fixed-position-side-bar');
			}

			$(window).on('scroll', function() {
				if ($(window).scrollTop() > 150) {
					element.addClass('fixed-position-side-bar');
				} else {
					element.removeClass('fixed-position-side-bar');
				}
			});
		};

		return {
			restrict: 'A',
			link: linkFunction
		};
	})
	.directive('fixedTop', function() {
		var linkFunction = function(scope, element, args) {
			$(window).on('scroll', function() {
				if ($(window).scrollTop() > 150) {
					element.addClass('fixed-top');
				} else {
					element.removeClass('fixed-top');
				}
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
	.directive('shareLink', ['$location', function($location) {
		var linkFunction = function(scope, element, args) {
			element.on('click', function(e) {
				e.preventDefault();

				var socialNetwork = args.shareLink,
					currentLocation = $location.absUrl(),
					popupWidth = window.innerWidth > 500 ? 500 : window.innerWidth,
					popupHeight = window.innerHeight > 400 ? 400 : window.innerHeight,
					dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
					dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

				width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
				height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

				var left = ((width / 2) - (popupWidth / 2)) + dualScreenLeft;
				var top = ((height / 2) - (popupHeight / 2)) + dualScreenTop;

				if (socialNetwork == 'facebook') {
					strLink = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(currentLocation);
				}

				if (socialNetwork == 'twitter') {
					strLink = 'http://twitter.com/share?url=' + encodeURIComponent(currentLocation);
				}

				if (socialNetwork == 'google') {
					strLink = 'http://plus.google.com/share?url=' + encodeURIComponent(currentLocation);
				}

				if (socialNetwork == 'linkedin') {
					strLink = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(currentLocation);
				}

				var strTitle = ((typeof args.title !== 'undefined') ? args.title : 'Social Share'),
					strParam = 'width=' + popupWidth + ',height=' + popupHeight + ',top=' + top + ',left=' + left + ',resizable=true',
					objWindow = window.open(strLink, strTitle, strParam).focus();
			});
		};

		return {
			restrict: 'A',
			link: linkFunction
		};
	}])
	.directive('activeMenu', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				var activeClass = args.activeMenu || 'active',
					links = element.find('li').not('.divider');

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
	.directive('toggleAuth', ['authService', function(authService) {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				var visible = args.toggleAuth;

				scope.$on('$routeChangeStart', function() {
					if (authService.isLoggedIn()) {
						if (visible == 'auth') {
							element.removeClass('ng-hide');
						} else {
							element.addClass('ng-hide');
						}
					} else {
						if (visible == 'auth') {
							element.addClass('ng-hide');
						} else {
							element.removeClass('ng-hide');
						}
					}
				});
			}
		};
	}])
	.directive('faqItem', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/partials/directives/faq.html'
		}
	})
	.directive('recipe', ['authService', function(authService) {
		var linkFunction = function(scope, element, args) {
			var auth = authService.isLoggedIn();
			scope.recipe.liked = auth ? (scope.recipe.likesArray.indexOf(auth.id) > -1) : false;
			scope.recipe.booked = auth ? (scope.recipe.likesArray.indexOf(auth.id) > -1) : false;
			scope.recipe.watched = auth ? (scope.recipe.watchedArray.indexOf(auth.id) > -1) : false;
			scope.auth = auth;
		};

		return {
			restrict: 'E',
			templateUrl: 'js/partials/recipes/recipe.html',
			link: linkFunction
		}
	}])
	.directive('recipeItem', ['authService', function(authService) {
		var linkFunction = function(scope, element, args) {
			var auth = authService.isLoggedIn();
			scope.auth = auth;
		};

		return {
			restrict: 'E',
			templateUrl: 'js/partials/recipes/recipe-item.html',
			link: linkFunction
		}
	}])
	.directive('serie', ['authService', function(authService) {
		var linkFunction = function(scope, element, args) {
			var auth = authService.isLoggedIn();
			scope.serie.liked = auth ? (scope.serie.likesArray.indexOf(auth.id) > -1) : false;
			scope.serie.booked = auth ? (scope.serie.likesArray.indexOf(auth.id) > -1) : false;
			scope.serie.watched = auth ? (scope.serie.watchedArray.indexOf(auth.id) > -1) : false;
			scope.auth = auth;
		};

		return {
			restrict: 'E',
			templateUrl: 'js/partials/series/serie.html',
			link: linkFunction
		}
	}])
	.directive('codepen', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/partials/recipes/codepen.html',
			scope: {
				recipe: '=recipe'
			}
		}
	})
	.directive('emailDuplicated', ['authService', function(authService) {
		var linkFunction = function(scope, element, args, ctrl) {
			element.on('keyup input blur', function() {
				var email = scope.registerCtl.user.email;
				authService
					.duplicated(email)
					.then(function(res) {
						ctrl.$setValidity('emailDuplicated', !res.data.error);

						return email
					});
			});
		};

		return {
			require: 'ngModel',
			restrict: 'A',
			link: linkFunction
		};
	}])
	.directive('focusMe', function() {
		var linkFunction = function(scope, element, args) {
			scope.$watch(args.focusMe, function(value) {
				if (value === true) {
					console.log(element[0], element.attr('class'));
					element[0].focus();
					scope[args.focusMe] = false;
				}
			});
		};

		return {
			restrict: 'A',
			link: linkFunction
		};
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
