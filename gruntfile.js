module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-sass');

    // Default tasks.
    grunt.registerTask('asset', ['copy']);
    grunt.registerTask('js', ['html2js', 'browserify', 'clean:js']);
    grunt.registerTask('css', ['sass', 'cssmin', 'clean:css']);
    grunt.registerTask('default', ['asset', 'css', 'js', 'uglify']);

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
                        'DelaApp': './<%= baseDir %>/app/app.js'
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
                options: {
                    base: '<%= baseDir %>/app'
                },
                src: ['<%= src.templates %>'],
                dest: '<%= distDir %>/templates.js',
                module: 'templates-html'
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= distDir %>/main.css': '<%= src.sass %>'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= distDir %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= distDir %>',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            index: {
                files: [{
                    src: '<%= baseDir %>/index.html',
                    dest: '<%= distDir %>/index.html'
                }]
            },
            images: {
                files: [{
                    dest: '<%=distDir%>/images',
                    src:['**/*'],
                    cwd: '<%=baseDir%>/images',
                    expand: true
                }]
            }
        },
        clean: {
            js: ['<%= distDir %>/templates.js'],
            css: ['<%= distDir %>/*.css', '!<%= distDir %>/*.min.css']
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