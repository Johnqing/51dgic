module.exports = function(grunt) {
    grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),
      concat: {
        options: {
          separator: ';'
        },
        dist: {
          src: ['assets/init/config.js', 'assets/init/main.js', 'assets/init/category.js', 'assets/init/fimg.js', 'assets/init/lazyload.js'],
          dest: 'dist/built.js'
        }
      },
      uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'dist/built.js',
                dest : 'dist/built.min.js'
            }
        }
    });
    //载入concat模块
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 注册任务（0.4后貌似需要[]来添加注册模块）
    grunt.registerTask('default', ['concat','uglify']);
  }