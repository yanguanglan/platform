var recipesApp = angular.module('recipesApp', ['ngRoute', 'ngMessages', 'ngSanitize', 'ng-showdown', 'ui.materialize', 'angularUtils.directives.dirDisqus', 'wu.masonry']);

recipesApp
	.config(function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider
			.when('/', {
				controller: 'HomeController as homeCtl',
				templateUrl: 'js/partials/home.html'
			})
			.when('/faq', {
				controller: 'FAQController as faqCtl',
				templateUrl: 'js/partials/faq.html'
			})
			.when('/statistics', {
				controller: 'StatsController as statsCtl',
				templateUrl: 'js/partials/stats.html',
				resolve: {
					recipes: function(Recipe) {
						return Recipe.all();
					},
					topics: function(Topic) {
						return Topic.all();
					},
					posts: function(Post) {
						return Post.all();
					}
				}
			})
			.when('/recipes', {
				controller: 'RecipesController as recipesCtl',
				templateUrl: 'js/partials/recipes/index.html',
				resolve: {
					recipes: function(Recipe) {
						return Recipe.all();
					},
					topics: function(Topic) {
						return Topic.all();
					}
				}
			})
			.when('/recipes/:uuid', {
				controller: 'RecipeController as recipeCtl',
				templateUrl: 'js/partials/recipes/show.html',
				resolve: {
					recipe: function(Recipe, $route) {
						return Recipe.get($route.current.params.uuid, true);
					},
					topics: function(Topic) {
						return Topic.all();
					}
				}
			})
			.when('/topics', {
				controller: 'TopicsController as topicsCtl',
				templateUrl: 'js/partials/topics/index.html',
				resolve: {
					topics: function(Topic) {
						return Topic.all();
					}
				}
			})
			.when('/topics/:uuid/recipes', {
				controller: 'TopicController as topicCtl',
				templateUrl: 'js/partials/topics/show.html',
				resolve: {
					topics: function(Topic) {
						return Topic.all();
					},
					topic: function(Topic, $route) {
						return Topic.get($route.current.params.uuid);
					}
				}
			})
			.when('/blog', {
				controller: 'BlogController as blogCtl',
				templateUrl: 'js/partials/posts/index.html',
				resolve: {
					posts: function(Post) {
						return Post.all();
					}
				}
			})
			.when('/posts/:uuid', {
				controller: 'PostController as postCtl',
				templateUrl: 'js/partials/posts/show.html',
				resolve: {
					post: function(Post, $route) {
						return Post.get($route.current.params.uuid);
					},
					posts: function(Post) {
						return Post.all(10);
					}
				}
			})
			.when('/error', {
				controller: 'ErrorController as errorCtl',
				templateUrl: 'js/partials/error.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.controller('NavigationController', ['$location', function($location) {
		var navigationCtl = this;
		navigationCtl.isCurrentPath = function(path) {
			return $location.path() == path;
		};
	}])
	.controller('HomeController', [function() {
		var homeCtl = this;
	}])
	.controller('FAQController', [function() {
		var faqCtl = this;
	}])
	.controller('StatsController', ['posts', 'recipes', 'topics', function(posts, recipes, topics) {
		var statsCtl = this;
		statsCtl.posts = posts;
		statsCtl.recipes = recipes;
		statsCtl.topics = topics;
	}])
	.controller('ErrorController', [function() {

	}])
	.controller('RecipesController', ['$scope', 'filterFilter', 'recipes', 'topics', 'Recipe', function($scope, filterFilter, recipes, topics, Recipe) {
		var recipesCtl = this;
		recipesCtl.recipes = recipes;
		recipesCtl.topics = topics;
		recipesCtl.searchFilter = '';
		recipesCtl.pageItems = 10;
		recipesCtl.currentPage = 0;
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
				Recipe.all(type).then(function(data) {
					recipesCtl.recipes = data;
				});
			}
		};

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
	}])
	.controller('RecipeController', ['recipe', 'topics', function(recipe, topics) {
		var recipeCtl = this;
		recipeCtl.recipe = recipe;
		recipeCtl.topics = topics;
	}])
	.controller('TopicsController', ['topics', function(topics) {
		var topicsCtl = this;
		recipesCtl.topics = topics;
	}])
	.controller('TopicController', ['topic', 'topics', function(topic, topics) {
		var topicCtl = this;
		topicCtl.topic = topic;
		topicCtl.topics = topics;
	}])
	.controller('BlogController', ['posts', function(posts) {
		var blogCtl = this;
		blogCtl.posts = posts;
	}])
	.controller('PostController', ['post', 'posts', function(post, posts) {
		var postCtl = this;
		postCtl.post = post;
		postCtl.posts = posts;
	}])
	.controller('RequestController', ['$scope', '$http', function($scope, $http) {

	}])
	.controller('ContactController', ['$scope', '$http', function($scope, $http) {
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
					.success(function(data) {
						if (data.error) {
							Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
						} else {
							Materialize.toast('<i class="mdi-action-done"></i> ' + $scope.contact.name + ', thank you!', 4000, 'green');
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
	}])
	.service('Recipe', ['$http', '$location', function($http, $location) {
		return {
			all: function(sortBy) {
				var sortBy = sortBy || null;
				return $http
					.get('api/recipes', {
						params: {
							sortBy: sortBy
						}
					})
					.then(function(data) {
						return data.data;
					}, function(err) {
						$location.path('/error');
					});
			},
			get: function(uuid, views) {
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
		};
	}])
	.service('Topic', ['$http', '$location', function($http, $location) {
		return {
			all: function(take) {
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
			},
			get: function(uuid) {
				return $http
					.get('api/topics/' + uuid)
					.then(function(data) {
						return data.data;
					}, function(err) {
						$location.path('/error');
					});
			}
		};
	}])
	.service('Post', ['$http', '$location', function($http, $location) {
		return {
			all: function(take) {
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
			},
			get: function(uuid) {
				return $http
					.get('api/posts/' + uuid)
					.then(function(data) {
						return data.data;
					}, function(err) {
						$location.path('/error');
					});
			}
		};
	}])
	.directive('mixpanel', function() {
		var linkFunction = function(scope, element, args) {
			element.on('click', function() {
				mixpanel.track(args.mixpanel);
			});
		};

		return {
			restrict: 'A',
			link: linkFunction
		}
	})
	.directive('scroller', function() {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				element.on('click', function(e) {
					e.preventDefault();

					var $link = $(this).attr('href'),
						$top = $($link).offset().top - $('.navbar-fixed').outerHeight();

					$('html, body').animate({
						scrollTop: $top
					}, 400);
				});
			}
		};
	})
	.filter('offset', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		}
	});
