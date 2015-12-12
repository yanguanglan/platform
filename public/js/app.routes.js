(function() {
	'use strict';

	angular
		.module('recipesApp')
		.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService) {
			$rootScope
				.$on('$routeChangeStart', function(event, next, current) {
					if (!authService.isLoggedIn() && next.auth) {
						console.log('auth');
						$location.path('/login');
					}
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
				.when('/recipes/:uuid', {
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
				.when('/series/:uuid/lessons', {
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
