module.exports = (grunt) ->

  config = require(__dirname + "/app/config/config")

  ###
  Dynamically load npm tasks
  ###
  require("load-grunt-tasks") grunt

  grunt.initConfig

    pkg: grunt.file.readJSON("package.json")

    # Watching changes files *.less, *.js,
    watch:
      all:
        files: [
          "Gruntfile.coffee"
          "public/js/**/*.js"
          "public/less/*.less"
          "public/less/**/*.less"
        ]
        tasks: [
          "clean:dev"
          "concat"
          "less:compileCore"
          "less:compileCustom"
          "watch"
        ]
        options:
          nospawn: true

    # Concat js files
    concat:
      options:
        separator: ";" #separates scripts

      bootstrap:
        src: [
          "public/js/bootstrap/transition.js"
          "public/js/bootstrap/alert.js"
          "public/js/bootstrap/button.js"
          "public/js/bootstrap/carousel.js"
          "public/js/bootstrap/collapse.js"
          "public/js/bootstrap/dropdown.js"
          "public/js/bootstrap/modal.js"
          "public/js/bootstrap/tooltip.js"
          "public/js/bootstrap/popover.js"
          "public/js/bootstrap/scrollspy.js"
          "public/js/bootstrap/tab.js"
          "public/js/bootstrap/affix.js"
        ]
        dest: "public/js/bootstrap.js"

      apps:
        src: [
          "public/js/apps/global.js"
          "public/js/apps/home.js"
          "public/js/apps/trick.js"
        ]
        dest: "public/js/apps.js"

      plugins:
        src: [
          "public/js/plugins/**.js"
        ]
        dest: "public/js/plugins.js"

    jshint:
      options:
        jshintrc: "js/bootstrap/.jshintrc"

      src:
        src: "js/bootstrap/*.js"


    #our uglify options
    uglify:
      options:
        report: "min"
        compress:
          dead_code: true
          drop_console: true
      # wrap: true,
      # sourceMap: true
      main_script:
        src: [
          "<%= concat.bootstrap.dest %>"
          "public/js/plugins.js"
          "public/js/apps.js"
        ]
        dest: "public/assets/js/apps.min.js"

    less:
      compileCore:
        options:
          strictMath: true
          sourceMap: true
          outputSourceFiles: true
          sourceMapURL: "bootstrap.css.map"
          sourceMapFilename: "public/css/bootstrap.css.map"

        files:
          "public/css/bootstrap.css": "public/less/bootstrap/bootstrap.less"

      compileCustom:
        options:
          strictMath: true
          sourceMap: true
          outputSourceFiles: true
          sourceMapURL: "apps.css.map"
          sourceMapFilename: "public/css/apps.css.map"

        files:
          "public/css/apps.css": "public/less/apps.less"

    cssmin:
      combine:
        files:
          "public/assets/css/apps.min.css": [
            "public/css/bootstrap.css"
            "public/css/apps.css"
          ]

    copy:
      main:
        files: [
          {
            expand: true
            cwd: "public/img/"
            src: ["**"]
            dest: "public/assets/img"
          }
          {
            expand: true
            cwd: "public/fonts/"
            src: ["**"]
            dest: "public/assets/fonts"
          }
        ]

    nodemon:
      dev:
        script: "server.js"
        options:
          ignore: [
            "README.md"
            "node_modules/**"
            ".DS_Store"
            "public"
          ]
          ext: "js"
          watch: [
            "app"
            "server.js"
            "Gruntfile.js"
            "package.json"
          ]
          delayTime: 1
          env:
            PORT: config.server.port
          cwd: __dirname

    concurrent:
      tasks: [
        "watch"
        "nodemon"
      ]
      options:
        logConcurrentOutput: true

    clean:
      dev: [
        "public/js/apps.js"
        "public/js/bootstrap.js"
      ]

      build: [
        "public/assets/*"
      ]

  grunt.registerTask "less-compile", [
    "clean:dev"
    "less:compileCore"
    "less:compileCustom"
  ]

  grunt.registerTask "dev", [
    "clean:dev"
    "less:compileCore"
    "less:compileCustom"
    "concat"
  ]

  grunt.registerTask "default", [
    "dev"
    "concurrent"
  ]

  grunt.registerTask "production", [
    "clean:build"
    "less:compileCore"
    "less:compileCustom"
    "cssmin"
    "copy"
    "concat"
    "uglify"
  ]
  return
