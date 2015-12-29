module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					sassDir: 'css/sass',
					cssDir: 'css',
					outputStyle: 'expanded',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'css/sass',
					cssDir: 'css'
				}
			}
		},
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost'
			},
			test: {
				options: {
					// set the location of the application files
					base: ['app']
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'js/production.min.js': ['js/production.js']
				}
			}
		},
		concat: {
			js: {
				files: {
					'js/production.js': [
						'js/app.module.js',
						'js/app.routes.js',
						'js/controllers/public/home.js',
						'js/controllers/public/navigation.js',
						'js/controllers/public/about.js',
						'js/controllers/public/faq.js',
						'js/controllers/public/stats.js',
						'js/controllers/public/error.js',
						'js/controllers/public/request.js',
						'js/controllers/public/requests.js',
						'js/controllers/public/contact.js',
						'js/controllers/recipes/index.js',
						'js/controllers/recipes/show.js',
						'js/controllers/series/index.js',
						'js/controllers/series/show.js',
						'js/controllers/lessons/show.js',
						'js/controllers/topics/index.js',
						'js/controllers/topics/show.js',
						'js/controllers/posts/index.js',
						'js/controllers/posts/show.js',
						'js/controllers/users/login.js',
						'js/controllers/users/register.js',
						'js/controllers/users/forgot.js',
						'js/controllers/users/reset.js',
						'js/controllers/users/dashboard.js',
						'js/controllers/users/account.js',
						'js/services/auth.js',
						'js/services/user.js',
						'js/services/recipe.js',
						'js/services/topic.js',
						'js/services/serie.js',
						'js/services/lesson.js',
						'js/services/post.js',
						'js/services/faq.js',
						'js/services/theme.js',
						'js/recipes.js'
					],
					'js/assets.js': [
						'bower_components/jquery/dist/jquery.min.js',
						'bower_components/angular/angular.min.js',
						'bower_components/angular-route/angular-route.min.js',
						'bower_components/angular-messages/angular-messages.min.js',
						'bower_components/angular-animate/angular-animate.min.js',
						'bower_components/angular-sanitize/angular-sanitize.min.js',
						'bower_components/angular-md5/angular-md5.min.js',
						'bower_components/angular-loading-bar/build/loading-bar.min.js',
						'bower_components/satellizer/satellizer.min.js',
						'bower_components/showdown/dist/showdown.min.js',
						'bower_components/ng-showdown/dist/ng-showdown.min.js',
						'bower_components/materialize/dist/js/materialize.min.js',
						'bower_components/angular-materialize/src/angular-materialize.js',
						'bower_components/angularUtils-disqus/dirDisqus.js'
					]
				}
			}
		},
		clean: {
			tmp: {
				src: ['js/tmp/']
			}
		},
		exec: {
			create_slugs: {
				cmd: function() {
					return 'cd .. && php artisan recipes:slugs';
				}
			},
			convert_content: {
				cmd: function() {
					return 'cd .. && php artisan recipes:content';
				}
			}
		},
		watch: {
			css: {
				files: ['css/sass/*.sass'],
				tasks: ['compass']
			},
			options: {
				livereload: true,
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('slugs', ['exec:create_slugs']);
	grunt.registerTask('content', ['exec:convert_content']);
	grunt.registerTask('production', ['concat:js', 'uglify:dist', 'clean:tmp', 'exec:create_slugs']);
	grunt.registerTask('default', ['compass', 'watch']);
};
