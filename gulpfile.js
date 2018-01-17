'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
      sass = require('gulp-sass'),
    rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
 minifyCss = require('gulp-clean-css'),
  imageMin = require('gulp-imagemin'),
      pump = require('pump'),
   connect = require('gulp-connect');

var options = {
  src: 'src',
  dist: 'dist'
};

var pumpCb = function (err) {
    if (err) {
        console.log('Error: ', err.toString());
    }
};

gulp.task('scripts', function() {
  pump([
    gulp.src(options.src + '/**/*.js'),
    maps.init(),
    concat('all.min.js'),
    uglify(),
    maps.write('./'),
    gulp.dest(options.dist + '/scripts')
    ],
    pumpCb
  );
});

gulp.task('styles', function(){
  pump([
    gulp.src(options.src + '/sass/*.scss'),
    sass(),
    maps.init(),
    concat('global.css'),
    minifyCss(),
    rename('all.min.css'),
    maps.write('./'),
    gulp.dest(options.dist + '/styles'),
    connect.reload()
    ],
    pumpCb
  );
});

gulp.task('images', function(){
  pump([
    gulp.src(options.src + '/images/**'),
      imageMin([
        imageMin.jpegtran({progressive: true}),
        imageMin.optipng({optimizationLevel: 5}),
      ]),
      gulp.dest(options.dist + '/content')
    ],
    pumpCb
  );
});

gulp.task('icons', function(){
  pump([
    gulp.src(options.src + '/icons/**'),
      imageMin([
        imageMin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
        }),
      ]),
      gulp.dest(options.dist + '/content')
    ],
    pumpCb
  );
});

gulp.task('clean', function(){
  return del(options.dist);
});

gulp.task('watchFiles', function(){
  gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
  gulp.watch(options.src + '/sass/**/*.sass', ['styles']);
});

gulp.task('html', function () {
  pump([
    gulp.src(options.src + '/*.html'),
        useref(),
        gulpif('*.js', uglify()),
        gulpif('*.css', minifyCss()),
        gulp.dest(options.dist)
      ],
      pumpCb
    );
});

gulp.task('build', ['clean'], function(){
    gulp.start(['scripts', 'styles', 'images', 'icons']);
    gulp.start('html');
    gulp.start('watchFiles');
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('default',['build'], function(){
  gulp.start('webserver');
});
