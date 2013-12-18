/*
 * grunt-juice
 * https://github.com/mike/grunt-juice
 *
 * Copyright (c) 2013 Mike Hu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var juice = require('juice'),
      path = require('path');

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
          dir = '',
          errors = 0;

      src.forEach(function(filepath) {
        html = grunt.file.read(filepath);

        dir = path.dirname(filepath);

        if (options.css && (typeof options.css === 'string')) {
          // Match a specific file pattern for the css (1 css : many html files)
          var cssfile = grunt.file.expand({
            matchBase: true,
            cwd: dir
          }, options.css);
          if (cssfile.length !== 1) { // We should only find 1 match
            grunt.verbose.writeln('Found ' + cssfile.length + ' css files matching pattern ' + options.css + '.');
            errors += 1;
            return false;
          }
          // grab the contents of the css file
          css = grunt.file.read(path.join(dir, cssfile[0]));
        } else {
          // Match up the source file based on filename (minus extension) (1 css : 1 html)
        }

        // Write the destination file.
        grunt.file.write(f.dest, juice.inlineContent(html, css));

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');

      });

      if (errors > 0) {
        grunt.log.writeln('Completed, but with ' + errors.toString().red + ' error(s).');
      }

    });
  });

};
