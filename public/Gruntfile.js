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

    grunt.registerTask('default', ['compass', 'watch']);
};
