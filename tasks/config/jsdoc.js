// tasks/config/jsdoc.js
// --------------------------------
// handlebar task configuration.

module.exports = function(grunt) {

  // We use the grunt.config api's set method to configure an
  // object to the defined string.
  grunt.config.set('jsdoc', {
    dev : {
        src: require('../pipeline').templateJSToInject,
        options: {
          destination: 'doc',
          template : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
          configure : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json'
        }
    }
  });

  // load npm module for handlebars.
  grunt.loadNpmTasks('grunt-jsdoc');
};
