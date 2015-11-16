module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-sass');

    // Default tasks.
    grunt.registerTask('lib', ['copy']);
    grunt.registerTask('js', ['html2js', 'browserify', 'clean:build']);
    grunt.registerTask('default', ['lib', 'sass', 'js', 'uglify']);

    grunt.initConfig({
        baseDir: 'src',
        distDir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['<%=baseDir%>/app/**/*.js'],
            templates: ['<%= baseDir %>/app/**/*.tpl.html'],
            sass: ['<%= baseDir %>/styles/main.scss']
        },
        uglify: {
            options: {
                banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
            },
            app: {
                src: '<%= distDir %>/app.js',
                dest: '<%= distDir %>/app.min.js'
            }
        },
        browserify: {
            js: {
                options: {
                    alias: {
                        app: './<%= baseDir %>/app/app.js'
                    },
                    debug: false,
                    transform: ['browserify-ngannotate']
                },
                files: {
                    '<%= distDir %>/app.js': ['<%= src.js %>', '<%= distDir %>/templates.js']
                }
            }
        },
        html2js: {
            html: {
                src: ['<%= src.templates %>'],
                dest: '<%= distDir %>/templates.js'
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= distDir %>/main.css': '<%= src.sass %>'
                }
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
        clean: {
            build: ['<%= distDir %>/templates.js']
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