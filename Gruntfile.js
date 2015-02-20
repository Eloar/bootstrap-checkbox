/*!
 * Bootstrap-checkbox's Gruntfile
 * http://vsn4ik.github.io/bootstrap-checkbox
 * Copyright 2014-2015 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-checkbox/blob/master/LICENSE)
 */

'use strict';

module.exports = function(grunt) {
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: [
        'dist',
        '*-dist.zip'
      ],
      docs: [
        '<%= copy.octicons.dest %>',
        '<%= cssmin.docs.dest %>',
        '<%= uglify.docs.dest %>'
      ]
    },
    copy: {
      js: {
        expand: true,
        src: 'js/**',
        dest: 'dist/'
      },
      octicons: {
        expand: true,
        cwd: 'node_modules/octicons/octicons',
        src: 'octicons.{css,eot,svg,ttf,woff}',
        dest: 'docs/assets/css/octicons'
      }
    },
    cssmin: {
      docs: {
        src: [
          'docs/assets/css/src/pygments-manni.css',
          'docs/assets/css/src/docs.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },
    htmlmin: {
      docs: {
        options: {
          collapseWhitespace: true,
          removeComments: true
        },
        expand: true,
        src: '_gh_pages/*.html'
      }
    },
    jshint: {
      options: {
        curly: true,
        globalstrict: true,
        latedef: true,
        node: true,
        noempty: true,
        strict: true
      },
      core: {
        options: {
          devel: true,
          jquery: true,
          globals: {
            define: true
          }
        },
        src: 'js/'
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      docs: {
        options: {
          jquery: true
        },
        src: 'docs/assets/js/src/'
      }
    },
    uglify: {
      core: {
        expand: true,
        src: 'dist/js/**/*.js',
        ext: '.min.js'
      },
      docs: {
        src: 'docs/assets/js/src/docs.js',
        dest: 'docs/assets/js/docs.min.js'
      }
    },
    usebanner: {
      options: {
        banner: [
          '/*!',
          ' * <%= pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1) %> v<%= pkg.version %> (<%= pkg.homepage %>)',
          ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
          ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)',
          ' */'
        ].join('\n') + '\n'
      },
      dist: 'dist/**'
    },
    symlink: {
      docs: {
        options: {
          overwrite: true
        },
        src: 'dist',
        dest: 'docs/dist'
      }
    },
    jekyll: {
      github: {
        options: {
          config: '_config.yml',
          raw: 'github: true'
        }
      }
    },
    compress: {
      dist: {
        options: {
          archive: '<%= compress.dist.dest %>.zip'
        },
        expand: true,
        cwd: 'dist',
        src: '**',
        dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('default', [
    'clean',
    'copy',
    'cssmin',
    'jshint',
    'uglify',
    'usebanner',
    'symlink'
  ]);

  grunt.registerTask('prep-release', [
    'jekyll',
    'htmlmin',
    'compress'
  ]);
};
