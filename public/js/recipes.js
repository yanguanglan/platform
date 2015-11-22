var recipesApp = angular.module('recipesApp', ['ngRoute', 'ngMessages', 'ngSanitize', 'ng-showdown', 'ui.materialize', 'angularUtils.directives.dirDisqus']);

recipesApp
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', {
                controller: 'HomeController as homeCtl',
                templateUrl: 'js/partials/home.html',
                resolve: {
                    recipes: function(Recipe) {
                        return Recipe.latest();
                    },
                    series: function(Serie) {
                        return Serie.latest();
                    }
                }
            })
            .when('/about', {
                controller: 'AboutController as aboutCtl',
                templateUrl: 'js/partials/about.html'
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
            .when('/series', {
                controller: 'SeriesController as seriesCtl',
                templateUrl: 'js/partials/series/index.html',
                resolve: {
                    series: function(Serie) {
                        return Serie.all();
                    }
                }
            })
            .when('/series/:uuid/lessons', {
                controller: 'SerieController as serieCtl',
                templateUrl: 'js/partials/series/show.html',
                resolve: {
                    serie: function(Serie, $route) {
                        return Serie.get($route.current.params.uuid);
                    }
                }
            })
            .when('/series/:serieID/lessons/:lessonID', {
                controller: 'LessonController as lessonCtl',
                templateUrl: 'js/partials/lessons/show.html',
                resolve: {
                    lesson: function(Lesson, $route) {
                        return Lesson.get($route.current.params.lessonID);
                    },
                    serie: function(Serie, $route) {
                        return Serie.get($route.current.params.serieID);
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
    .controller('HomeController', ['recipes', 'series', function(recipes, series) {
        var homeCtl = this;
        homeCtl.recipes = recipes;
        homeCtl.series = series;
    }])
    .controller('AboutController', [function() {
        var aboutCtl = this;
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
        recipesCtl.showSearchForm = false;
        recipesCtl.searchFilter = '';
        recipesCtl.sortByType = 'date';
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
                recipesCtl.sortByType = type;
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
    .controller('SeriesController', ['series', function(series) {
        var seriesCtl = this;
        seriesCtl.series = series;
    }])
    .controller('SerieController', ['serie', function(serie) {
        var serieCtl = this;
        serieCtl.serie = serie;
    }])
    .controller('LessonController', ['lesson', 'serie', function(lesson, serie) {
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
    }])
    .controller('ContactController', ['$scope', '$http', function($scope, $http) {
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
    }])
    .factory('Recipe', ['$http', '$location', function($http, $location) {
        var service = {
            all: all,
            get: get,
            latest: latest
        };

        return service;

        function all(sortBy) {
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
        };

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
        };

        function latest() {
            return $http
                .get('api/recipes-latest')
                .then(function(data) {
                    return data.data;
                }, function(err) {
                    $location.path('/error');
                });
        }
    }])
    .service('Serie', ['$http', '$location', function($http, $location) {
        return {
            all: function(sortBy) {
                var sortBy = sortBy || null;
                return $http
                    .get('api/series', {
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
            get: function(uuid) {
                return $http
                    .get('api/series/' + uuid)
                    .then(function(data) {
                        return data.data;
                    }, function(err) {
                        $location.path('/error');
                    });
            },
            latest: function() {
                return $http
                    .get('api/series-latest')
                    .then(function(data) {
                        return data.data;
                    }, function(err) {
                        $location.path('/error');
                    });
            }
        };
    }])
    .service('Lesson', ['$http', '$location', function($http, $location) {
        return {
            get: function(uuid) {
                return $http
                    .get('api/lessons/' + uuid)
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
