module.exports = function(grunt){ "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reports: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        './xs-lib-dom-single-node.js']
    },
    qunit: {
      all: ['test/*.html']
    },
    clean: {
      all: ['dist']
    },
    uglify : {
      all: {
        src: 'xs-dom-single-node-lib.js',
        dest: 'dist/xs-dom-single-node-lib.min.js'
      }
    }
  });
  grunt.registerTask('check', ['jshint', 'qunit']);
  grunt.registerTask('build', ['jshint', 'qunit', 'clean', 'uglify']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

};
