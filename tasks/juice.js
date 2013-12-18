/*
 * grunt-juice
 * https://github.com/mike/grunt-juice
 *
 * Copyright (c) 2013 Mike Hu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var juice = require('juice');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('juice', 'Exposes the functions of the Juice library to help inline CSS with HTML.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      css: false
    });

    var count = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      // Determine which files to process
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var html = '',
          css = '',
          errors = 0;

      src.forEach(function(filepath) {
        html = grunt.file.read(filepath);

        if (options.css) {
          // Match up the source file based on filename (minus extension) (1 css : 1 html)
        } else {
          // Match a specific file pattern for the css (1 css : many html files)
        }

        // Write the destination file.
        grunt.file.write(f.dest, juice.inlineContent(html, css));

      });

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
