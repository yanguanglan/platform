(function() {
	'use strict';

	angular.module('recipesApp', [
		'ngRoute',
		'ngMessages',
		'ngSanitize',
		'ngAnimate',
		'satellizer',
		'angular-loading-bar',
		'ng-showdown',
		'ui.materialize',
		'angularUtils.directives.dirDisqus',
		'angular-md5'
	]);
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.run(['$rootScope', '$location', '$window', 'authService', function($rootScope, $location, $window, authService) {
			$rootScope
				.$on('$routeChangeStart', function(event, next, current) {
					if (!authService.isLoggedIn() && next.auth) {
						console.log('auth');
						$location.path('/login');
					}
				});

			$rootScope
				.$on('$routeChangeSuccess', function() {
					$window.scrollTo(0,0);
				});
		}])
		.config(['$locationProvider', '$routeProvider', 'cfpLoadingBarProvider', '$authProvider', function($locationProvider, $routeProvider, cfpLoadingBarProvider, $authProvider) {
			$authProvider.loginUrl = '/api/auth/login';
			$authProvider.signupUrl = '/api/auth/register';
			$authProvider.github({
				clientId: 'f8f2e77b448821cc1ac5'
			});
			cfpLoadingBarProvider.includeSpinner = false;
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/', {
					controller: 'HomeController as homeCtl',
					templateUrl: 'js/partials/home.html',
					resolve: {
						recipes: function(recipeService) {
							return recipeService.latest();
						},
						series: function(serieService) {
							return serieService.latest();
						}
					}
				})
				.when('/about', {
					controller: 'AboutController as aboutCtl',
					templateUrl: 'js/partials/about.html'
				})
				.when('/faq', {
					controller: 'FAQController as faqCtl',
					templateUrl: 'js/partials/faq.html',
					resolve: {
						items: function(faqService) {
							return faqService.all();
						}
					}
				})
				.when('/statistics', {
					controller: 'StatsController as statsCtl',
					templateUrl: 'js/partials/stats.html',
					resolve: {
						recipes: function(recipeService) {
							return recipeService.all();
						},
						topics: function(topicService) {
							return topicService.all();
						},
						posts: function(postService) {
							return postService.all();
						}
					}
				})
				.when('/requests', {
					controller: 'RequestsController as requestsCtl',
					templateUrl: 'js/partials/requests.html',
					resolve: {
						themes: function(themeService) {
							return themeService.all();
						}
					}
				})
				.when('/login', {
					controller: 'LoginController as loginCtl',
					templateUrl: 'js/partials/users/login.html'
				})
				.when('/register', {
					controller: 'RegisterController as registerCtl',
					templateUrl: 'js/partials/users/register.html'
				})
				.when('/forgot', {
					controller: 'ForgotController as forgotCtl',
					templateUrl: 'js/partials/users/forgot.html'
				})
				.when('/reset/:uuid/:token', {
					controller: 'ResetController as resetCtl',
					templateUrl: 'js/partials/users/reset.html'
				})
				.when('/dashboard', {
					controller: 'DashboardController as dashCtl',
					templateUrl: 'js/partials/users/dashboard.html',
					resolve: {
						user: function(userService) {
							return userService.dashboard();
						}
					},
					auth: true
				})
				.when('/account', {
					controller: 'AccountController as accountCtl',
					templateUrl: 'js/partials/users/account.html',
					auth: true
				})
				.when('/recipes', {
					controller: 'RecipesController as recipesCtl',
					templateUrl: 'js/partials/recipes/index.html',
					resolve: {
						recipes: function(recipeService) {
							return recipeService.all();
						},
						topics: function(topicService) {
							return topicService.all();
						}
					}
				})
				.when('/recipes/:uuid/:slug', {
					controller: 'RecipeController as recipeCtl',
					templateUrl: 'js/partials/recipes/show.html',
					resolve: {
						recipe: function(recipeService, $route) {
							return recipeService.get($route.current.params.uuid, true);
						},
						topics: function(topicService) {
							return topicService.all();
						}
					}
				})
				.when('/topics', {
					controller: 'TopicsController as topicsCtl',
					templateUrl: 'js/partials/topics/index.html',
					resolve: {
						topics: function(topicService) {
							return topicService.all();
						}
					}
				})
				.when('/topics/:uuid/recipes', {
					controller: 'TopicController as topicCtl',
					templateUrl: 'js/partials/topics/show.html',
					resolve: {
						topics: function(topicService) {
							return topicService.all();
						},
						topic: function(topicService, $route) {
							return topicService.get($route.current.params.uuid);
						}
					}
				})
				.when('/series', {
					controller: 'SeriesController as seriesCtl',
					templateUrl: 'js/partials/series/index.html',
					resolve: {
						series: function(serieService) {
							return serieService.all();
						}
					},
					auth: false
				})
				.when('/series/:uuid/:slug', {
					controller: 'SerieController as serieCtl',
					templateUrl: 'js/partials/series/show.html',
					resolve: {
						serie: function(serieService, $route) {
							return serieService.get($route.current.params.uuid, true);
						}
					}
				})
				.when('/series/:serieID/lessons/:lessonID', {
					controller: 'LessonController as lessonCtl',
					templateUrl: 'js/partials/lessons/show.html',
					resolve: {
						lesson: function(lessonService, $route) {
							return lessonService.get($route.current.params.lessonID);
						},
						serie: function(serieService, $route) {
							return serieService.get($route.current.params.serieID);
						}
					}
				})
				.when('/blog', {
					controller: 'PostsController as postsCtl',
					templateUrl: 'js/partials/posts/index.html',
					resolve: {
						posts: function(postService) {
							return postService.all();
						}
					}
				})
				.when('/posts/:uuid', {
					controller: 'PostController as postCtl',
					templateUrl: 'js/partials/posts/show.html',
					resolve: {
						post: function(postService, $route) {
							return postService.get($route.current.params.uuid);
						},
						posts: function(postService) {
							return postService.all(10);
						}
					}
				})
				.when('/error', {
					controller: 'ErrorController as errorCtl',
					templateUrl: 'js/partials/error.html'
				})
				.otherwise({
					redirectTo: '/error'
				});
		}]);
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['recipes', 'series'];

    function HomeController(recipes, series) {
        var homeCtl = this;
		homeCtl.recipes = recipes;
		homeCtl.series = series;
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = ['authService', '$auth', '$rootScope', '$location', 'md5'];

	function NavigationController(authService, $auth, $rootScope, $location, md5) {
		var navCtl = this;
		navCtl.user = authService.isLoggedIn();
		navCtl.logout = function() {
			$auth
				.logout()
				.then(function() {
					authService.logout();
					navCtl.user = null;
				});
		};
		navCtl.gravatar = navCtl.user ? 'http://www.gravatar.com/avatar/' + md5.createHash(navCtl.user.email) + '&s=80' : null;
		navCtl.isAuthenticated = function() {
			return $auth.isAuthenticated();
		};

		$rootScope.$on('update', function(event, data) {
			navCtl.user = data;
			navCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(navCtl.user.email) + '&s=80';
		});
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('AboutController', AboutController);

    function AboutController() {
        var aboutCtl = this;
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('FAQController', FAQController);

	FAQController.$inject = ['items', 'filterFilter', '$scope'];

	function FAQController(items, filterFilter, $scope) {
		var faqCtl = this;
		faqCtl.items = items;
		faqCtl.searchFilter = '';
		faqCtl.clearSearch = function() {
			faqCtl.searchFilter = '';
		};
		$scope.$watch(angular.bind(faqCtl, function() {
			return faqCtl.searchFilter;
		}), function(newVal, oldVal) {
			faqCtl.filteredItems = filterFilter(faqCtl.items, newVal);
		});
	}
})();

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

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('ErrorController', ErrorController);

    function ErrorController() {
        var errorCtl = this;
    }
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('RequestController', RequestController);

    RequestController.$inject = ['$scope', '$http'];

    function RequestController($scope, $http) {
        var requestCtl = this;
        requestCtl.loading = false;
        requestCtl.request = {
            name: '',
            email: '',
            message: ''
        };
        requestCtl.submit = function(valid) {
            if (valid) {
                $http
                    .post('contact', {
                        name: requestCtl.request.name,
                        email: requestCtl.request.email,
                        message: requestCtl.request.message
                    })
                    .success(function(data) {
                        if (data.error) {
                            Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                        } else {
                            Materialize.toast('<i class="mdi-action-done"></i> ' + requestCtl.request.name + ', thank you!', 4000, 'green');
                            $('#requestModal').closeModal();

                            requestCtl.contact = {
                                name: '',
                                email: '',
                                message: ''
                            };
                            $scope.requestForm.name.$setPristine();
                            $scope.requestForm.email.$setPristine();
                            $scope.requestForm.message.$setPristine();
                        }
                    })
                    .error(function() {
                        Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                    });
            } else {
                Materialize.toast('<i class="mdi-action-highlight-remove"></i> Please enter valid data!', 4000, 'custom-red');
                $scope.requestForm.name.$setDirty();
                $scope.requestForm.email.$setDirty();
                $scope.requestForm.message.$setDirty();
            }
        };
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RequestsController', RequestsController);

	RequestsController.$inject = ['themes', 'authService', 'themeService'];

	function RequestsController(themes, authService, themeService) {
		var requestsCtl = this;
		requestsCtl.themes = themes;
		requestsCtl.auth = authService.isLoggedIn();
		requestsCtl.vote = function(theme) {
			if (requestsCtl.auth) {
				var index = requestsCtl.themes.indexOf(theme);

				Materialize.toast('Theme "' + theme.title + '" is voted on your behalf!', 5000);

				themeService
					.vote(theme.id)
					.then(function(data) {
						requestsCtl.themes = data;
					});
			} else {
				$('#unsignedModal').openModal();
			}
		};
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', '$http'];

    function ContactController($scope, $http) {
        var contactCtl = this;
        contactCtl.loading = false;
        contactCtl.contact = {
            name: '',
            email: '',
            message: ''
        };
        contactCtl.submit = function(valid) {
            if (valid) {
                $http
                    .post('contact', {
                        name: contactCtl.contact.name,
                        email: contactCtl.contact.email,
                        message: contactCtl.contact.message
                    })
                    .success(function(data) {
                        if (data.error) {
                            Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                        } else {
                            Materialize.toast('<i class="mdi-action-done"></i> ' + contactCtl.contact.name + ', thank you!', 4000, 'green');
                            $('#contactModal').closeModal();

                            contactCtl.contact = {
                                name: '',
                                email: '',
                                message: ''
                            };
                            $scope.contactForm.name.$setPristine();
                            $scope.contactForm.email.$setPristine();
                            $scope.contactForm.message.$setPristine();
                        }
                    })
                    .error(function() {
                        Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                    });
            } else {
                Materialize.toast('<i class="mdi-action-highlight-remove"></i> Please enter valid data!', 4000, 'custom-red');
                $scope.contactForm.name.$setDirty();
                $scope.contactForm.email.$setDirty();
                $scope.contactForm.message.$setDirty();
            }
        };
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RecipesController', RecipesController);

	RecipesController.$inject = ['$scope', 'filterFilter', 'recipes', 'topics', 'recipeService'];

	function RecipesController($scope, filterFilter, recipes, topics, recipeService) {
		var recipesCtl = this;
		recipesCtl.recipes = recipes;
		recipesCtl.topics = topics;
		recipesCtl.showSearchForm = false;
		recipesCtl.listAppearance = window.innerWidth < 890 ? true : false;
		recipesCtl.searchFilter = '';
		recipesCtl.sortByType = 'date';
		recipesCtl.pageItems = 10;
		recipesCtl.currentPage = 0;
		recipesCtl.v1 = true;
		recipesCtl.v2 = true;
		recipesCtl.version = 'all';
		recipesCtl.toggleAppearance = function(listAppearance) {
			recipesCtl.listAppearance = listAppearance;
		};
		recipesCtl.toggleVersion = function() {
			var v1 = recipesCtl.v1,
				v2 = recipesCtl.v2,
				version;
			if (v1 && v2) {
				version = 'all';
			} else if (v1) {
				version = 1;
			} else if (v2) {
				version = 2;
			} else {
				version = 'none';
			}

			recipesCtl.version = version;

			recipeService.all(recipesCtl.sortByType, version).then(function(data) {
				recipesCtl.recipes = data;
			});
		};
		recipesCtl.toggleSearchForm = function() {
			recipesCtl.searchFilter = '';
			recipesCtl.showSearchForm = !recipesCtl.showSearchForm;
		};
		recipesCtl.clearSearch = function() {
			recipesCtl.searchFilter = '';
		};
		recipesCtl.range = function(min, max, step) {
			step = (step == undefined) ? 1 : step;
			var input = [],
				i = min;
			while (i <= max) {
				input.push(i);
				i += step;
			}
			return input;
		};
		recipesCtl.stepDown = function() {
			if (recipesCtl.currentPage > 0) {
				recipesCtl.currentPage -= 1;
			}

			return recipesCtl.currentPage;
		};
		recipesCtl.step = function(n) {
			if (recipesCtl.currentPage != n - 1) {
				recipesCtl.currentPage = n - 1;
			}

			return recipesCtl.currentPage;
		};
		recipesCtl.stepUp = function() {
			if (recipesCtl.currentPage < (recipesCtl.pagesNumber - 1)) {
				recipesCtl.currentPage += 1;
			}
			return recipesCtl.currentPage;
		};
		recipesCtl.previousPageDisabled = function() {
			return recipesCtl.currentPage === 0 ? 'disabled' : null;
		};
		recipesCtl.nextPageDisabled = function() {
			return recipesCtl.currentPage === recipesCtl.pagesNumber - 1 ? 'disabled' : null;
		};

		recipesCtl.sortBy = function(type) {
			if (type == 'date' || type == 'views' || type == 'likes') {
				recipesCtl.sortByType = type;
				recipeService.all(type, recipesCtl.version).then(function(data) {
					recipesCtl.recipes = data;
				});
			}
		};

		$(window).resize(function() {
			$scope.$apply(function() {
				if (window.innerWidth < 890) {
					recipesCtl.listAppearance = true;
				}
			});
		});

		$scope.$watch(angular.bind(recipesCtl, function() {
			return recipesCtl.recipes;
		}), function(newVal, oldVal) {
			if (!angular.equals(newVal, recipesCtl.filteredRecipes)) {
				recipesCtl.filteredRecipes = filterFilter(newVal, recipesCtl.searchFilter);
				recipesCtl.pagesNumber = Math.ceil(recipesCtl.filteredRecipes.length / recipesCtl.pageItems);
			}
		});

		$scope.$watch(angular.bind(recipesCtl, function() {
			return recipesCtl.searchFilter;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				recipesCtl.filteredRecipes = filterFilter(recipesCtl.recipes, newVal);
				recipesCtl.pagesNumber = Math.ceil(recipesCtl.filteredRecipes.length / recipesCtl.pageItems);
			}
		});
	}
})();

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
		recipeCtl.watched = recipeCtl.auth ? (recipeCtl.recipe.watchedArray.indexOf(recipeCtl.auth.id) > -1) : false;
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
				} else {
					recipeCtl.recipe.likesArray.push(recipeCtl.auth.id);
				}
			}
		});
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('SeriesController', SeriesController);

    SeriesController.$inject = ['$scope', 'filterFilter', 'series', 'serieService'];

    function SeriesController($scope, filterFilter, series, serieService) {
        var seriesCtl = this;
        seriesCtl.series = series;
        seriesCtl.showSearchForm = false;
        seriesCtl.searchFilter = '';
        seriesCtl.sortByType = 'date';
        seriesCtl.pageItems = 10;
        seriesCtl.currentPage = 0;
        seriesCtl.v1 = true;
        seriesCtl.v2 = true;
        seriesCtl.version = 'all';
        seriesCtl.toggleVersion = function() {
            var v1 = seriesCtl.v1,
                v2 = seriesCtl.v2,
                version;
            if (v1 && v2) {
                version = 'all';
            } else if (v1) {
                version = 1;
            } else if (v2) {
                version = 2;
            } else {
                version = 'none';
            }

            seriesCtl.version = version;

            serieService.all(seriesCtl.sortByType, seriesCtl.version).then(function(data) {
                seriesCtl.series = data;
            });
        };
        seriesCtl.toggleSearchForm = function() {
            seriesCtl.searchFilter = '';
            seriesCtl.showSearchForm = !seriesCtl.showSearchForm;
        };
        seriesCtl.clearSearch = function() {
            seriesCtl.searchFilter = '';
        };
        seriesCtl.range = function(min, max, step) {
            step = (step == undefined) ? 1 : step;
            var input = [],
                i = min;
            while (i <= max) {
                input.push(i);
                i += step;
            }
            return input;
        };
        seriesCtl.stepDown = function() {
            if (seriesCtl.currentPage > 0) {
                seriesCtl.currentPage -= 1;
            }

            return seriesCtl.currentPage;
        };
        seriesCtl.step = function(n) {
            if (seriesCtl.currentPage != n - 1) {
                seriesCtl.currentPage = n - 1;
            }

            return seriesCtl.currentPage;
        };
        seriesCtl.stepUp = function() {
            if (seriesCtl.currentPage < (seriesCtl.pagesNumber - 1)) {
                seriesCtl.currentPage += 1;
            }
            return seriesCtl.currentPage;
        };
        seriesCtl.previousPageDisabled = function() {
            return seriesCtl.currentPage === 0 ? 'disabled' : null;
        };
        seriesCtl.nextPageDisabled = function() {
            return seriesCtl.currentPage === seriesCtl.pagesNumber - 1 ? 'disabled' : null;
        };

        seriesCtl.sortBy = function(type) {
            if (type == 'date' || type == 'views' || type == 'likes') {
                seriesCtl.sortByType = type;
                serieService.all(seriesCtl.sortByType, seriesCtl.version).then(function(data) {
                    seriesCtl.series = data;
                });
            }
        };

        $scope.$watch(angular.bind(seriesCtl, function() {
            return seriesCtl.series;
        }), function(newVal, oldVal) {
            if (!angular.equals(newVal, seriesCtl.filteredSeries)) {
                seriesCtl.filteredSeries = filterFilter(newVal, seriesCtl.searchFilter);
                seriesCtl.pagesNumber = Math.ceil(seriesCtl.filteredSeries.length / seriesCtl.pageItems);
            }
        });

        $scope.$watch(angular.bind(seriesCtl, function() {
            return seriesCtl.searchFilter;
        }), function(newVal, oldVal) {
            if (newVal != oldVal) {
                seriesCtl.filteredSeries = filterFilter(seriesCtl.series, newVal);
                seriesCtl.pagesNumber = Math.ceil(seriesCtl.filteredSeries.length / seriesCtl.pageItems);
            }
        });
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('SerieController', SerieController);

	SerieController.$inject = ['serie', 'authService', 'serieService', '$scope'];

	function SerieController(serie, authService, serieService, $scope) {
		var serieCtl = this;
		serieCtl.serie = serie;
		serieCtl.auth = authService.isLoggedIn();
		serieCtl.booked = serieCtl.auth ? (serieCtl.serie.bookedArray.indexOf(serieCtl.auth.id) > -1) : false;
		serieCtl.liked = serieCtl.auth ? (serieCtl.serie.likesArray.indexOf(serieCtl.auth.id) > -1) : false;
		serieCtl.watched = serieCtl.auth ? (serieCtl.serie.watchedArray.indexOf(serieCtl.auth.id) > -1) : false;
		serieCtl.toggleBook = function() {
			serieCtl.booked = !serieCtl.booked;

			if (serieCtl.booked) {
				Materialize.toast('This serie is now booked!', 5000);

				serieService.book(serieCtl.serie.id);
			} else {
				Materialize.toast('This serie is not booked anymore!', 5000);

				serieService.unbook(serieCtl.serie.id);
			}
		};
		serieCtl.toggleLike = function() {
			if (serieCtl.auth) {
				serieCtl.liked = !serieCtl.liked;

				if (serieCtl.liked) {
					Materialize.toast('This serie is now one of your favourites!', 5000);

					serieService.like(serieCtl.serie.id);
				} else {
					Materialize.toast('This serie is not one of your favourites anymore!', 5000);

					serieService.dislike(serieCtl.serie.id);
				}
			} else {
				$('#unsignedModal').openModal();
			}
		};
		$scope.$watch(angular.bind(serieCtl, function() {
			return serieCtl.liked;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				var index = serieCtl.serie.likesArray.indexOf(serieCtl.auth.id);
				if (index > -1) {
					serieCtl.serie.likesArray.splice(index, 1);
				} else {
					serieCtl.serie.likesArray.push(serieCtl.auth.id);
				}
			}
		});
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('LessonController', LessonController);

    LessonController.$inject = ['lesson', 'serie'];

    function LessonController(lesson, serie) {
        var lessonCtl = this;
		lessonCtl.lesson = lesson;
		lessonCtl.serie = serie;
		lessonCtl.previous = null;
		lessonCtl.next = null;
		lessonCtl.previousPageExists = function() {
			return lessonCtl.lesson.order != 1;
		};
		lessonCtl.nextPageExists = function() {
			return lessonCtl.lesson.order != lessonCtl.serie.lessons.length;
		};
		lessonCtl.activeLesson = function(current, loop) {
			return current == loop ? 'red-text' : 'black-text';
		};
		angular.forEach(lessonCtl.serie.lessons, function(lesson) {
			if (lessonCtl.previousPageExists()) {
				if (lesson.order == lessonCtl.lesson.order - 1) {
					lessonCtl.previous = lesson.uuid;
				}
			}

			if (lessonCtl.nextPageExists()) {
				if (lesson.order == lessonCtl.lesson.order + 1) {
					lessonCtl.next = lesson.uuid;
				}
			}
		});
    }
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('TopicsController', TopicsController);

    TopicsController.$inject = ['topics'];

    function TopicsController(topics) {
        var topicsCtl = this;
		recipesCtl.topics = topics;
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('TopicController', TopicController);

	TopicController.$inject = ['$scope', 'filterFilter', 'topic', 'topics', 'topicService'];

	function TopicController($scope, filterFilter, topic, topics, topicService) {
		var topicCtl = this;
		topicCtl.topic = topic;
		topicCtl.topics = topics;
		topicCtl.showSearchForm = false;
		topicService.listAppearance = window.innerWidth < 890 ? true : false;
		topicCtl.searchFilter = '';
		topicCtl.sortByType = 'date';
		topicCtl.pageItems = 10;
		topicCtl.currentPage = 0;
		topicCtl.v1 = true;
		topicCtl.v2 = true;
		topicCtl.version = 'all';
		topicCtl.toggleAppearance = function(listAppearance) {
			topicCtl.listAppearance = listAppearance;
		};
		topicCtl.toggleVersion = function() {
			var v1 = topicCtl.v1,
				v2 = topicCtl.v2,
				version;
			if (v1 && v2) {
				version = 'all';
			} else if (v1) {
				version = 1;
			} else if (v2) {
				version = 2;
			} else {
				version = 'none';
			}

			topicCtl.version = version;

			topicService.get(topicCtl.topic.uuid, topicCtl.sortByType, topicCtl.version).then(function(data) {
				topicCtl.topic = data;
			});
		};
		topicCtl.toggleSearchForm = function() {
			topicCtl.searchFilter = '';
			topicCtl.showSearchForm = !topicCtl.showSearchForm;
		};
		topicCtl.clearSearch = function() {
			topicCtl.searchFilter = '';
		};
		topicCtl.range = function(min, max, step) {
			step = (step == undefined) ? 1 : step;
			var input = [],
				i = min;
			while (i <= max) {
				input.push(i);
				i += step;
			}
			return input;
		};
		topicCtl.stepDown = function() {
			if (topicCtl.currentPage > 0) {
				topicCtl.currentPage -= 1;
			}

			return topicCtl.currentPage;
		};
		topicCtl.step = function(n) {
			if (topicCtl.currentPage != n - 1) {
				topicCtl.currentPage = n - 1;
			}

			return topicCtl.currentPage;
		};
		topicCtl.stepUp = function() {
			if (topicCtl.currentPage < (topicCtl.pagesNumber - 1)) {
				topicCtl.currentPage += 1;
			}
			return topicCtl.currentPage;
		};
		topicCtl.previousPageDisabled = function() {
			return topicCtl.currentPage === 0 ? 'disabled' : null;
		};
		topicCtl.nextPageDisabled = function() {
			return topicCtl.currentPage === topicCtl.pagesNumber - 1 ? 'disabled' : null;
		};

		topicCtl.sortBy = function(type) {
			if (type == 'date' || type == 'views' || type == 'likes') {
				topicCtl.sortByType = type;
				topicService.get(topicCtl.topic.uuid, topicCtl.sortByType, topicCtl.version).then(function(data) {
					topicCtl.topic = data;
				});
			}
		};

		$(window).resize(function() {
			$scope.$apply(function() {
				if (window.innerWidth < 890) {
					topicCtl.listAppearance = true;
				}
			});
		});

		$scope.$watch(angular.bind(topicCtl, function() {
			return topicCtl.topic.recipes;
		}), function(newVal, oldVal) {
			if (!angular.equals(newVal, topicCtl.filteredRecipes)) {
				topicCtl.filteredRecipes = filterFilter(newVal, topicCtl.searchFilter);
				topicCtl.pagesNumber = Math.ceil(topicCtl.filteredRecipes.length / topicCtl.pageItems);
			}
		});

		$scope.$watch(angular.bind(topicCtl, function() {
			return topicCtl.searchFilter;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				topicCtl.filteredRecipes = filterFilter(topicCtl.topic.recipes, newVal);
				topicCtl.pagesNumber = Math.ceil(topicCtl.filteredRecipes.length / topicCtl.pageItems);
			}
		});
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['posts'];

    function PostsController(posts) {
        var postsCtl = this;
		postsCtl.posts = posts;
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('PostController', PostController);

	PostController.$inject = ['post', 'posts'];

	function PostController(post, posts) {
		var postCtl = this;
		postCtl.post = post;
		postCtl.posts = posts;
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$auth', '$location', '$rootScope', '$scope'];

	function LoginController(authService, $auth, $location, $rootScope, $scope) {
		var loginCtl = this;
		loginCtl.user = {
			email: '',
			password: ''
		};
		loginCtl.submit = function(valid) {
			if (valid) {
				$auth
					.login({
						email: loginCtl.user.email,
						password: loginCtl.user.password
					})
					.then(function(res) {
						var data = res.data;

						if (data.error) {
							console.log(data.msg);
						} else {
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/');
						}
					}, function(err) {
						console.log(err);
					});
			} else {
				$scope.loginForm.email.$setDirty();
				$scope.loginForm.password.$setDirty();
			}
		};
		loginCtl.socialLogin = function() {
			console.log('github');

			$auth.authenticate('github')
				.then(function(response) {
					console.log(response);
				})
				.catch(function(response) {
					Materialize.toast('Oops, we couldn\'t get your email!', 5000);
				});
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['authService', '$auth', '$scope', '$rootScope', '$location'];

	function RegisterController(authService, $auth, $scope, $rootScope, $location) {
		var registerCtl = this;
		registerCtl.user = {
			name: '',
			email: '',
			password: ''
		};
		registerCtl.submit = function(valid) {
			if (valid) {
				$auth
					.signup({
						name: registerCtl.user.name,
						email: registerCtl.user.email,
						password: registerCtl.user.password
					})
					.then(function(res) {
						var data = res.data;

						if (data.error) {
							console.log(data.msg);
						} else {
							$auth.setToken(data.token)
							$rootScope.$emit('update', data.user);
							authService.setUser(data.user);
							$location.path('/dashboard');
						}
					}, function(err) {
						console.log(err);
					});
			} else {
				$scope.registerForm.name.$setDirty();
				$scope.registerForm.email.$setDirty();
				$scope.registerForm.password.$setDirty();
			}
		};
		registerCtl.socialLogin = function() {
			console.log('github');

			$auth.authenticate('github')
				.then(function(response) {
					console.log(response);
				})
				.catch(function(response) {
					Materialize.toast('Oops, we couldn\'t get your email!', 5000);
				});
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('ForgotController', ForgotController);

	ForgotController.$inject = ['userService', '$scope'];

	function ForgotController(userService, $scope) {
		var forgotCtl = this;
		forgotCtl.user = {
			email: ''
		};
		forgotCtl.submit = function(valid) {
			if (valid) {
				Materialize.toast('An email was sent please follow the procedure!', 5000);

				userService.requestPassword(forgotCtl.user.email);
			} else {
				$scope.forgotForm.email.$setDirty();
			}
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('ResetController', ResetController);

	ResetController.$inject = ['userService', '$scope', '$routeParams', '$location'];

	function ResetController(userService, $scope, $routeParams, $location) {
		var resetCtl = this;
		resetCtl.user = {
			password: '',
			repeat_password: ''
		};
		resetCtl.submit = function(isValid) {
			if (isValid) {
				userService
					.resetPassword($routeParams.uuid, $routeParams.token, resetCtl.user.password)
					.then(function(data) {
						if (data.data.error) {
							Materialize.toast(data.data.msg, 5000);
						} else {
							Materialize.toast(data.data.user.name + ' your password is updated!', 5000);
							$location.path('/login');
						}
					});
			} else {
				$scope.resetForm.password.$setDirty();
				$scope.resetForm.repeat_password.$setDirty();
			}
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['user', 'md5'];

	function DashboardController(user, md5) {
		var dashCtl = this;
		dashCtl.user = user.user;
		dashCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(dashCtl.user.email) + '&s=120';
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['authService', 'userService', '$rootScope', '$scope', 'md5'];

	function AccountController(authService, userService, $rootScope, $scope, md5) {
		var accountCtl = this;
		accountCtl.user = authService.isLoggedIn();
		accountCtl.gravatar = 'http://www.gravatar.com/avatar/' + md5.createHash(accountCtl.user.email) + '&s=120';
		accountCtl.submitProfile = function(isValid) {
			if (isValid) {
				userService
					.updateProfile(accountCtl.user.id, accountCtl.user.name, accountCtl.user.email)
					.then(function(data) {
						if (data.error) {

						} else {
							authService.setUser(data.data);
							$rootScope.$emit('update', data.data);
							Materialize.toast(accountCtl.user.name + ' your profile is updated!', 5000);
						}
					});
			} else {
				$scope.profileForm.name.$setDirty();
				$scope.profileForm.email.$setDirty();
			}
		};
		accountCtl.user.password = '';
		accountCtl.user.repeat_password = '';
		accountCtl.submitPassword = function(isValid) {
			if (isValid) {
				userService
					.updatePassword(accountCtl.user.id, accountCtl.user.password)
					.then(function(data) {
						if (data.error) {

						} else {
							Materialize.toast(accountCtl.user.name + ' your password is updated!', 5000);
							accountCtl.user.password = '';
							accountCtl.user.repeat_password = '';
							$scope.passwordForm.password.$setPristine();
							$scope.passwordForm.repeat_password.$setPristine();
						}
					});
			} else {
				$scope.passwordForm.password.$setDirty();
				$scope.passwordForm.repeat_password.$setDirty();
			}
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('authService', authService);

	authService.$inject = ['$http', '$location', '$auth'];

	function authService($http, $location, $auth) {
		var service = {
			duplicated: duplicated,
			setUser: setUser,
			isLoggedIn: isLoggedIn,
			logout: logout
		};

		return service;

		function duplicated(email) {
			return $http
				.get('api/auth/users-availability', {
					params: {
						email: email
					}
				});
		}

		function setUser(auth) {
			localStorage.setItem('user', JSON.stringify(auth));

			return auth;
		}

		function isLoggedIn() {
			var user = JSON.parse(localStorage.getItem('user'));

			return $auth.isAuthenticated() ? user : false;
		}

		function logout() {
			localStorage.removeItem('user');
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('userService', userService);

	userService.$inject = ['$http', '$location'];

	function userService($http, $location) {
		var service = {
			account: account,
			dashboard: dashboard,
			updateProfile: updateProfile,
			updatePassword: updatePassword,
			requestPassword: requestPassword,
			resetPassword: resetPassword
		};

		return service;

		function account() {
			var sortBy = sortBy || 'date',
				versionBy = versionBy || 'all';

			return $http
				.get('api/users/account')
				.then(function(data) {
					return data.data;
				}, function(err) {
					if (err.data.error) {
						$location.path('/login');
					} else {
						$location.path('/error');
					}
					console.log(err);
				});
		}

		function dashboard() {
			var views = views || null;
			return $http
				.get('api/users/dashboard')
				.then(function(data) {
					return data.data;
				}, function(err) {
					if (err.data.error) {
						$location.path('/login');
					} else {
						$location.path('/error');
					}
					console.log(err);
				});
		}

		function updateProfile(id, name, email) {
			return $http
				.put('api/users/' + id, {
					name: name,
					email: email
				});
		}

		function updatePassword(id, password) {
			return $http
				.put('api/users/update/password/' + id, {
					password: password
				});
		}

		function requestPassword(email) {
			return $http
				.post('api/users/request/password', {
					email: email
				});
		}

		function resetPassword(uuid, token, password) {
			return $http
				.put('api/users/reset/password', {
					uuid: uuid,
					token: token,
					password: password
				});
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('recipeService', recipeService);

	recipeService.$inject = ['$http', '$location'];

	function recipeService($http, $location) {
		var service = {
			all: all,
			get: get,
			latest: latest,
			like: like,
			dislike: dislike,
			book: book,
			unbook: unbook
		};

		return service;

		function all(sortBy, versionBy) {
			var sortBy = sortBy || 'date',
				versionBy = versionBy || 'all';

			return $http
				.get('api/recipes', {
					params: {
						sortBy: sortBy,
						versionBy: versionBy
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function get(uuid, views) {
			var views = views || null;
			return $http
				.get('api/recipes/' + uuid, {
					params: {
						views: views
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function latest() {
			return $http
				.get('api/recipes-latest')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function like(recipe_id) {
			return $http
				.post('api/recipes-like', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function dislike(recipe_id) {
			return $http
				.post('api/recipes-dislike', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function book(recipe_id) {
			return $http
				.post('api/recipes-book', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function unbook(recipe_id) {
			return $http
				.post('api/recipes-unbook', {
					recipe_id: recipe_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('topicService', topicService);

    topicService.$inject = ['$http', '$location'];

    function topicService($http, $location) {
        var service = {
            all: all,
            get: get
        };

        return service;

        function all(take) {
            var take = take || null;
            return $http
                .get('api/topics', {
                    params: {
                        take: take
                    }
                })
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }

        function get(uuid, sortBy, versionBy) {
            var sortBy = sortBy || 'date',
                versionBy = versionBy || 'all';

            return $http
                .get('api/topics/' + uuid, {
                    params: {
                        sortBy: sortBy,
                        versionBy: versionBy
                    }
                })
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('serieService', serieService);

	serieService.$inject = ['$http', '$location'];

	function serieService($http, $location) {
		var service = {
			all: all,
			get: get,
			latest: latest,
			like: like,
			dislike: dislike,
			book: book,
			unbook: unbook
		};

		return service;

		function all(sortBy, versionBy) {
			var sortBy = sortBy || 'date',
				versionBy = versionBy || 'all';

			return $http
				.get('api/series', {
					params: {
						sortBy: sortBy,
						versionBy: versionBy
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function get(uuid, views) {
			var views = views || null;

			return $http
				.get('api/series/' + uuid, {
					params: {
						views: views
					}
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function latest() {
			return $http
				.get('api/series-latest')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function like(serie_id) {
			return $http
				.post('api/series-like', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function dislike(serie_id) {
			return $http
				.post('api/series-dislike', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function book(serie_id) {
			return $http
				.post('api/series-book', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}

		function unbook(serie_id) {
			return $http
				.post('api/series-unbook', {
					serie_id: serie_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}
	}
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('lessonService', lessonService);

    lessonService.$inject = ['$http', '$location'];

    function lessonService($http, $location) {
        var service = {
            get: get
        };

        return service;

        function get(uuid) {
            return $http
                .get('api/lessons/' + uuid)
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('postService', postService);

    postService.$inject = ['$http', '$location'];

    function postService($http, $location) {
        var service = {
            all: all,
            get: get
        };

        return service;

        function all(take) {
            var take = take || null;
            return $http
                .get('api/posts', {
                    params: {
                        take: take
                    }
                })
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }

        function get(uuid) {
            return $http
                .get('api/posts/' + uuid)
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('recipesApp')
        .factory('faqService', faqService);

    faqService.$inject = [];

    function faqService() {
        var faq = [
            {
                title: 'What is a "Recipe"?',
                content: 'Recipe is a quite specific AngularJS functionality. This functionality is explained in detail so our users can grasp the logic behind and re-use it in the future at will. Every recipe includes a fully functioning Codepen example so you can use this as a playground. Apart from those we include some exercises per recipe based on its functionality. That way you can take your learning experience to a further step.',
                image: 'img/faq_recipe.png'
            },
            {
                title: 'What are Recipes "Topics"?',
                content: 'Topics is the way we try to group recipes into some basic categories. So for example "Controller" topic includes recipes with content dedicated to AngularJS controllers. Of course there are many cases where a recipe can belong to more than one Topic because of its content.',
                image: 'img/faq_topics.png'
            },
            {
                title: 'What are Recipes "Resources"?',
                content: 'Resources are sections from the official AngularJS documentation on which every Recipe you study is based on. That way you can study a Recipe, check its Codepen example and then explore some more the framework\'s official documentation.',
                image: 'img/faq_resources.png'
            },
            {
                title: 'Can i test a "Recipe" live?',
                content: 'Every recipe includes a fully functioning Codepen example so you can use this as a playground. Apart from those we include some exercises per recipe based on its functionality. That way you can take your learning experience to a further step.',
                image: 'img/faq_live.png'
            },
            {
                title: 'Can i request a "Recipe"?',
                content: 'Sure you can. This can be easily achieved by sending us an email describing there your request and thoughts.',
                image: 'img/faq_recipe_request.png'
            },
            {
                title: 'What is a "Serie"?',
                content: 'Serie is a long tutorial divided into shorter lessons which are steps for the tutorial\'s end goal. Every Serie has a specific goal which is to build form A to Z a real life application with AngularJS.',
                image: 'img/faq_series.png'
            },
            {
                title: 'Can i request a "Serie"?',
                content: 'Sure you can. Since the creation of a Serie is not that easy or fast process we came up with following solution. Every 1st of each month we are going to announce 3 candidates series titles. Our members are going to get notified so they can vote for the one they prefer. Voting results will be constantly visible so at the end of the month the winner serie will be announced. This serie is going to be delivered during the coming month while a new voting process will have already started as described above. That way we hope you understand how valuable is your will for us.',
                image: 'img/faq_series_request.png'
            },
            {
                title: 'Can i use a "Serie"?',
                content: 'Sure you can. Every serie is updated regularly on Github. So you can easily clone its repository and use it at will. That is one of our main goals. Every serie\'s lesson has a dedicated branch in this repository in case you want to follow along the serie\'s lessons step by step for learning purposes.',
                image: 'img/faq_use.png'
            }
        ], service = {
            all: all
        };

        return service;

        function all() {
            return faq;
        }
    }
})();

(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('themeService', themeService);

	themeService.$inject = ['$http', '$location'];

	function themeService($http, $location) {
		var service = {
			all: all,
			vote: vote
		};

		return service;

		function all() {
			return $http
				.get('api/themes')
				.then(function(data) {
					return data.data;
				}, function(err) {
					$location.path('/error');
				});
		}

		function vote(theme_id) {
			return $http
				.post('api/themes-vote', {
					theme_id: theme_id
				})
				.then(function(data) {
					return data.data;
				}, function(err) {
					console.log(err);
					// $location.path('/error');
				});
		}
	}
})();

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
			scope.recipe.booked = auth ? (scope.recipe.bookedArray.indexOf(auth.id) > -1) : false;
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
			scope.serie.booked = auth ? (scope.serie.bookedArray.indexOf(auth.id) > -1) : false;
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
	.directive('pwCheck', [function () {
		return {
			require: 'ngModel',
			link: function (scope, el, attrs, ctrl) {
				var firstPassword = '#' + attrs.pwCheck;
				el.add(firstPassword).on('input', function () {
					scope.$apply(function () {
						var validity = el.val() === $(firstPassword).val();
						ctrl.$setValidity('pwCheck', validity);
					});
				});
			}
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
