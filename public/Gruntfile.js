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
		protractor: {
			options: {
				configFile: "node_modules/grunt-protractor-runner/node_modules/protractor/example/conf.js", // Default config file
				noColor: false, // If true, protractor will not use colors in its output.
				args: {
					// Arguments passed to the command
				}
			},
			e2e: {
				options: {
					keepAlive: false
				}
			},
		},
		watch: {
			files: ['css/sass/*.sass'],
			tasks: ['compass']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['compass', 'watch']);
	grunt.registerTask('tests', ['connect:test', 'protractor:e2e']);
};
