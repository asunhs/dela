module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-html2js');

    // Default tasks.
    grunt.registerTask('lib', ['copy']);
    grunt.registerTask('default', ['lib', 'browserify', 'uglify', 'html2js']);

    grunt.initConfig({
        baseDir: 'src',
        distDir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['<%=baseDir%>/app/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
            },
            app: {
                src: '<%= distDir %>/app.js',
                dest: '<%= distDir %>/app.min.js'
            },
            templates: {
                src: '<%= distDir %>/templates.js',
                dest: '<%= distDir %>/templates.min.js'
            }
        },
        browserify: {
            build: {
                options: {
                    debug: false,
                    transform: ['browserify-ngannotate']
                },
                files: {
                    'dist/app.js': ['<%=baseDir%>/**/*.js']
                }
            }
        },
        html2js: {
            main: {
                src: ['<%=baseDir%>/**/*.tpl.html'],
                dest: '<%= distDir %>/templates.js'
            }
        },
        copy: {
            index: {
                files: [{
                    src: '<%= baseDir %>/index.html',
                    dest: '<%= distDir %>/index.html'
                }]
            }
        },
        watch:{
            configFiles: {
                files: ['gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    });
};