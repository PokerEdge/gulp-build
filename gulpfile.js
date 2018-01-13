'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  // rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  minifyCss = require('gulp-clean-css');

var options = {
  src: 'src',
  dist: 'dist'
};

// As a developer, I should be able to run the gulp scripts command at the
// command line to concatenate, minify, and copy all of the project’s JavaScript
// files into an all.min.js file that is then copied to the dist/scripts folder
gulp.task('scripts', [''], function(){
  // concatenate, minify, and copy all of the project’s JavaScript files into an
  // all.min.js file that is then copied to the dist/scripts folder.

});

// As a developer, I should be able to run the gulp styles command at the command
// line to compile the project’s SCSS files into CSS, then concatenate and minify
// into an all.min.css file that is then copied to the dist/styles folder.
  // gulp.task('styles',[''], function(){
  //
  // });

// As a developer, when I run the gulp scripts or gulp styles commands at the
// command line, source maps are generated for the JavaScript and CSS files
// respectively.

// As a developer, I should be able to run the gulp images command at the
// command line to optimize the size of the project’s JPEG and PNG files, and
// then copy those optimized images to the dist/content folder.

// As a developer, I should be able to run the gulp clean command at the
// command line to delete all of the files and folders in the dist folder.

// As a developer, I should be able to run the gulp build command at the
// command line to run the clean, scripts, styles, and images tasks with
// confidence that the clean task completes before the other commands.

// As a developer, I should be able to run the gulp command at the command
// line to run the build task and serve my project using a local web server.

// As a developer, when I run the default gulp command, it should continuously
// watch for changes to any .scss file in my project. When there is a change
// to one of the .scss files, the gulp styles command is run and the files
// are compiled, concatenated, and minified to the dist folder. My project
// should then reload in the browser, displaying the changes.
  // gulp.task('default',[''], function(){
  //
  // });
