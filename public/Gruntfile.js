module.exports = function (grunt) {
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
		watch: {
			files: ['css/sass/*.sass'],
			tasks: ['compass']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['compass', 'watch']);
};