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
    }
  });
  grunt.registerTask('check', ['jshint', 'qunit']);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
};
