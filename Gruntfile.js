module.exports = function(grunt) {
  "use strict";

  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      all: {
        files: [
          "Gruntfile.js",
          "public/js/**/*.js",
          "public/less/*.less",
          "public/less/**/*.less"
        ],
        tasks: [
          "newer:less",
          "newer:concat",
          "jshint",
          "watch"
        ],
        options: {
          nospawn: true
        }
      }
    },
    concat: {
      bootstrap: {
        src: [
          "public/js/bootstrap/transition.js",
          "public/js/bootstrap/alert.js",
          "public/js/bootstrap/button.js",
          // "public/js/bootstrap/carousel.js",
          "public/js/bootstrap/collapse.js",
          "public/js/bootstrap/dropdown.js",
          "public/js/bootstrap/modal.js",
          "public/js/bootstrap/tooltip.js",
          "public/js/bootstrap/popover.js",
          // "public/js/bootstrap/scrollspy.js",
          "public/js/bootstrap/tab.js",
          // "public/js/bootstrap/affix.js"
        ],
        dest: "public/js/bootstrap.js"
      },
      apps: {
        src: [
          // "public/js/plugins/nprogress.js",
          "public/js/apps/global.js",
          "public/js/apps/user.js",
          "public/js/apps/home.js",
          "public/js/apps/trick.js"
        ],
        dest: "public/js/apps.js"
      },
      plugins: {
        src: ["public/js/plugins/*"],
        dest: "public/js/plugins.js"
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      bootstrap: {
        options: {
          jshintrc: "public/js/bootstrap/.jshintrc",
        },
        src: "'public/js/bootstrap/*.js'"
      },
      web: {
        jshintrc: "public/js/.jshintrc",
        src: ['public/js/apps/*.js']
      },
      afterConcat: {
        src: ['public/js/apps.js']
      }
    },
    uglify: {
      options: {
        report: "min",
        compress: {
          dead_code: true,
          drop_console: true
        }
      },
      main_script: {
        src: ["<%= concat.bootstrap.dest %>", "public/js/plugins.js", "public/js/apps.js"],
        dest: "public/assets/js/apps.min.js"
      }
    },
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: "bootstrap.css.map",
          sourceMapFilename: "public/css/bootstrap.css.map"
        },
        files: {
          "public/css/bootstrap.css": "public/less/bootstrap/bootstrap.less"
        }
      },
      compileCustom: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: "apps.css.map",
          sourceMapFilename: "public/css/apps.css.map"
        },
        files: {
          "public/css/apps.css": "public/less/apps.less"
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          "public/assets/css/apps.min.css": ["public/css/bootstrap.css", "public/css/apps.css"]
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: "public/img/",
          src: ["**"],
          dest: "public/assets/img"
        }, {
          expand: true,
          cwd: "public/fonts/",
          src: ["**"],
          dest: "public/assets/fonts"
        }]
      }
    },
    nodemon: {
      dev: {
        script: "server.js",
        options: {
          ignore: ["README.md", "node_modules/**", ".DS_Store", "public"],
          ext: "js",
          watch: ["app", "public", "server.js", "Gruntfile.js", "package.json"],
          delayTime: 1,
          env: {
            PORT: process.env.PORT || 3001
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      watch: [
        "watch",
        "nodemon"
      ],
      js: [
        "newer:concat",
        "jshint"
      ],
      css: [
        "newer:less:compileCore",
        "less:compileCustom"
      ],
      options: {
        logConcurrentOutput: true
      }
    },
    clean: {
      dev: ["public/js/apps.js", "public/js/bootstrap.js"],
      build: ["public/assets/*"]
    }
  });
  grunt.registerTask("less-compile", ["clean:dev", "less:compileCore", "less:compileCustom"]);
  grunt.registerTask("dev", ["clean:dev", "less:compileCore", "less:compileCustom", "concat"]);
  grunt.registerTask("default", ["dev", "concurrent:css", "concurrent:js", "concurrent:watch"]);
  grunt.registerTask("production", ["clean:build", "less:compileCore", "less:compileCustom", "cssmin", "copy", "concat", "uglify"]);
  grunt.registerTask('heroku', 'dev');
  grunt.registerTask('heroku:development', 'dev');
  grunt.registerTask('heroku:production', 'production');
};
