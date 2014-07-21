module.exports = function(grunt) {
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Process CSS (sass and autoprefixer)
        sass: {
            dev: {
                options: {
                    style: 'expanded', // nested, compact, compressed, expanded.
                    compass: true,
                    debugInfo: true,
                    sourcemap: true,
                    lineNumbers: true
                },
                files: {
                    'src/styles/main.css': 'sass/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compact',
                    compass: true
                },
                files: {
                    'dist/styles/main.css': 'sass/main.scss'
                }
            }
        },

        compass: { // Task
            dist: { // Target
                options: { // Target options
                    imageDir: 'dist/images',
                    sassDir: 'src/sass',
                    cssDir: 'dist/styles',
                    noLineComments: false,
                    debugInfo: false,
                    outputStyle: 'compact'
                }
            },
            dev: { // Another target
                options: {
                    config: 'config.rb',
                    sassDir: 'sass',
                    cssDir: 'styles',
                    noLineComments: true,
                    debugInfo: false,
                    sourcemap: false,
                    outputStyle: 'compact'
                }
            },
            watch: {
                options: {
                    config: 'config.rb',
                    sassDir: 'sass',
                    cssDir: 'styles',
                    noLineComments: false,
                    debugInfo: false,
                    sourcemap: false,
                    watch: true
                }
            }
        },



        autoprefixer: {
            options: {
                browsers: ['> 5%', 'last 2 version', 'ie 8', 'ie 9']
            },
            dev: {
                expand: true,
                flatten: true,
                cascade: true,
                options: {
                    browsers: ['> 5%', 'last 2 version', 'ie 8', 'ie 9'],
                    map: true,
                    diff: true
                },
                src: 'styles/*.css',
                dest: 'styles/'

                // files: [{
                //     src: ['src/styles/main.css'],
                //     dest: 'src/styles/main.css'
                // }]
            },
            dist: {
                options: {
                    browsers: ['> 5%', 'last 2 version', 'ie 8', 'ie 9'],
                    map: true,
                    diff: true
                },

                files: [{
                    src: ['styles/main.css'],
                    dest: 'dist/styles/main.css'
                }]
            }
        },

        //Process Javascript

        modernizr: {
            "devFile": "src/components/modernizr/modernizr.js",
            "outputFile": "dist/js/vendor/modernizr.js",
            "extra": {
                "shiv": true,
                "printshiv": false,
                "load": true,
                "mq": false,
                "cssclasses": true
            },
            "extensibility": {
                "addtest": false,
                "prefixed": false,
                "teststyles": false,
                "testprops": false,
                "testallprops": false,
                "hasevents": false,
                "prefixes": false,
                "domprefixes": false
            },
            "uglify": true
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: '**/*.js',
                    dest: 'dist/js'
                }]
            },
        },

        concat: {
            dist: {
                src: ['src/js/main.js', 'src/js/plugins/*.js'],
                dest: 'dist/js/main.js'
            }
        },

        //Process html
        useminPrepare: {
            html: 'dist/index.html',
            options: {
                uglify: 'uglify'
            }
        },

        //clean dist folders
        clean: {
            dist: ['dist/js/*', 'dist/images/*', 'dist/styles/*', 'dist/index.html']
        },

        usemin: {
            html: 'dist/index.html'
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false,
                    removeEmptyAttributes: false,
                    removeCommentsFromCDATA: false,
                    removeRedundantAttributes: false,
                    collapseBooleanAttributes: false,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    // Destination : Source
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        //Process images
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.png'],
                    dest: 'images/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.jpg'],
                    dest: 'images/',
                    ext: '.jpg'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/components/jquery/',
                    src: ['jquery.min.js'],
                    dest: 'dist/js/vendor/'
                }, {
                    expand: true,
                    cwd: 'src',
                    src: ['*.html'],
                    dest: 'dist/'
                }, {
                    expand: true,
                    cwd: 'src/styles/components/',
                    src: ['*.css'],
                    dest: 'dist/styles/components'
                }, {
                    expand: true,
                    cwd: 'src/fonts/',
                    src: ['*'],
                    dest: 'dist/fonts'
                }, {
                    expand: true,
                    cwd: 'src/js/',
                    src: ['**/*.js'],
                    dest: 'dist/js'
                }]
            }
        },
        watch: {
            /* watch to see if the sass files are changed, compile and add prefixes */
            styles: {
                files: ['sass/**/*.{scss,sass}'],
                tasks: ['compass:dev', 'autoprefixer:dev']
            },

            /* watch our files for change, reload */
            livereload: {
                files: ['*.html', '*.php', 'styles/*.css', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}', '*.js'],
                options: {
                    livereload: true
                }
            }
        },

        gitcommit: {
            task: {
                options: {
                    repository: 'git@github.com:smilight/cattravel.git',
                    branch: 'master',
                    message: 'commit v<%= pkg.version %>',
                    ignore: ['.gitignore',
                        'Gruntfile.js',
                        'node_modules',
                        'nbproject',
                        'README.md',
                        'test',
                        '**/*.scss',
                        '**/*.sass',
                        '.sass-cache',
                        '.idea',
                        '.DS_Store',
                        'config.rb'
                    ],
                    directory: '/'
                },
                files: '**'

            }
        },
        gitpush: {
            options: {
                repository: 'git@github.com:smilight/cattravel.git',
                message: 'commit v<%= pkg.version %>',
                ignore: ['.gitignore',
                    'Gruntfile.js',
                    'node_modules',
                    'nbproject',
                    'README.md',
                    'test',
                    '**/*.scss',
                    '**/*.sass',
                    '.sass-cache',
                    '.idea',
                    '.DS_Store',
                    'config.rb'
                ]
            },
            files: 'dist'
        },

        git_deploy: {
            github: {
                options: {
                    url: 'git@github.com:smilight/cattravel.git',
                    message: 'commit v<%= pkg.version %>',
                    ignore: ['.gitignore',
                        'Gruntfile.js',
                        'node_modules',
                        'nbproject',
                        'README.md',
                        'test',
                        '**/*.scss',
                        '**/*.sass',
                        '.sass-cache',
                        '.idea',
                        '.DS_Store',
                        'config.rb'
                    ]
                },
                src: '/'
            },
            bitbucket: {
                options: {
                    url: 'git@bitbucket.org:ne1ro/flycats.git',
                    message: 'commit v<%= pkg.version %>',
                    ignore: ['.gitignore',
                        'Gruntfile.js',
                        'node_modules',
                        'nbproject',
                        'README.md',
                        'test',
                        '**/*.scss',
                        '**/*.sass',
                        '.sass-cache',
                        '.idea',
                        '.DS_Store',
                        'config.rb'
                    ]
                },
                src: 'assets/'
            },
        }
    });




    //Task list
    grunt.registerTask('build', ['copy:dist', 'autoprefixer:dist', 'concat:dist', 'uglify:dist', 'useminPrepare', 'usemin', 'htmlmin:dist', 'imagemin','compass:dist']);
    grunt.registerTask('build:dist', ['clean', 'copy:dist', 'uglify:dist', 'imagemin','compass:dist']);
    grunt.registerTask('default', ['watch']);
};