 module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    transport: {
       options: {
        paths:['.'],
        alias : '<%= pkg.spm.alias %>'
       },

       init : {
          options : {
            idleading : 'dist/init/'
          }
          ,files : [
           {
              cwd : 'init'
             ,src : '*'
             ,filter : 'isFile'
             ,dest : '.build/init/'
           }
         ]
       }
    },
    concat: {
        options : {
          paths : ['.'],
          include : 'relative'
        },
        index : {
          options : {
            include : 'relative'
          }
         ,files : {
            'dist/main.js' : ['.build/init/main.js'],
            'dist/main-debug.js' : ['.build/init/main.js']
         }
       }
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');

  grunt.registerTask('build', ['transport', 'concat']);
};