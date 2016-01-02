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
			$(window).on('scroll', function() {
				fixClasses();
			});

			function fixClasses() {
				var scrollTop = $(window).scrollTop();

				if (scrollTop > 150) {
					element.addClass('fixed-position-side-bar');
				} else {
					element.removeClass('fixed-position-side-bar');
				}

				var sidebar = $('.faq-side-bar').outerHeight(true),
					footer = $('footer').outerHeight(true),
					navbar = $('.navbar-fixed').outerHeight(true),
					screenH = window.innerHeight,
					docH = $(document).height(),
					space = docH - scrollTop - footer - navbar;

				if (scrollTop > 0 && space < 550) {
					$('.faq-side-bar').addClass('fixed-height');
				} else {
					$('.faq-side-bar').removeClass('fixed-height');
				}
			}
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
	.directive('shareLink', ['$location', '$auth', function($location, $auth) {
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

				if (socialNetwork == 'pocket') {
					console.log('pocket');
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
	.directive('masterColor', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				scope.$on('$routeChangeStart', function() {
					var path = $location.path();
					element.removeClass('master-red master-yellow');
					element.addClass(path.substring(7, 1) == 'series' ? 'master-yellow' : 'master-red');
				});
			}
		};
	}])
	.directive('activeMenu', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				var activeClass = args.activeMenu || 'active',
					links = element.find('li').not('.ng-hide');
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
			scope.recipe.likedMsg = auth ? (scope.recipe.liked ? 'Favourited one!' : 'Not favourited yet!') : scope.recipe.likesArray.length + ' likes!';
			scope.recipe.booked = auth ? (scope.recipe.bookedArray.indexOf(auth.id) > -1) : false;
			scope.recipe.bookedMsg = scope.recipe.booked ? 'Bookmarked one!' : 'Not Bookmarked yet!';
			scope.recipe.watched = auth ? (scope.recipe.watchedArray.indexOf(auth.id) > -1) : false;
			scope.recipe.watchedMsg = auth ? (scope.recipe.watched ? 'Already visited!' : 'Not visited yet!') : scope.recipe.views + ' views!';
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
			scope.serie.likedMsg = auth ? (scope.serie.liked ? 'Favourited one!' : 'Not favourited yet!') : scope.serie.likesArray.length + ' likes!';
			scope.serie.booked = auth ? (scope.serie.bookedArray.indexOf(auth.id) > -1) : false;
			scope.serie.bookedMsg = scope.serie.booked ? 'Bookmarked one!' : 'Not Bookmarked yet!';
			scope.serie.watched = auth ? (scope.serie.watchedArray.indexOf(auth.id) > -1) : false;
			scope.serie.watchedMsg = auth ? (scope.serie.watched ? 'Already visited!' : 'Not visited yet!') : scope.serie.views + ' views!';
			scope.auth = auth;
		};

		return {
			restrict: 'E',
			templateUrl: 'js/partials/series/serie.html',
			link: linkFunction
		}
	}])
	.directive('noSerie', function() {
		var linkFunction = function(scope, element, args) {
			$(window)
				.resize(function() {
					var h = angular.element('.card-serie').height() - 20;
					element.find('.no-serie-inner').css('min-height', h);
				})
				.resize();
		};

		return {
			restrict: 'E',
			templateUrl: 'js/partials/series/no-serie.html',
			link: linkFunction
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
	.directive('emailDuplicated', ['authService', function(authService) {
		var linkFunction = function(scope, element, args, ctrl) {
			element.on('input blur keyup', function() {
				scope.$watch('registerCtl.user.email', function(newVal, oldVal) {
					if (newVal != oldVal) {
						authService
							.duplicated(newVal)
							.then(function(res) {
								ctrl.$setValidity('emailDuplicated', !res.data.error);

								return newVal;
							});
					}
				});
			});
		};

		return {
			require: 'ngModel',
			restrict: 'A',
			link: linkFunction
		};
	}])
	.directive('pwCheck', [function() {
		return {
			require: 'ngModel',
			link: function(scope, el, attrs, ctrl) {
				var firstPassword = '#' + attrs.pwCheck;
				el.add(firstPassword).on('input', function() {
					scope.$apply(function() {
						var validity = el.val() === $(firstPassword).val();
						ctrl.$setValidity('pwCheck', validity);
					});
				});
			}
		};
	}])
	.directive('nagPrism', ['$compile', function($compile) {
		return {
			restrict: 'A',
			transclude: true,
			scope: {
				source: '@'
			},
			link: function(scope, element, attrs, controller, transclude) {
				scope.$watch('source', function(v) {
					element.find(".recipe-content").html(v);
					angular.forEach(element.find(".language-javascript, .language-html, .language-markdown, .language-php, .language-css, .language-bash, pre"), function(el) {
						Prism.highlightElement(el);
					});
				});

				transclude(function(clone) {
					if (clone.html() !== undefined) {
						element.find("code").html(clone.html());
						$compile(element.contents())(scope.$parent);
					}
				});
			},
			template: '<div class="recipe-content"></div>'
		};
	}])
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
