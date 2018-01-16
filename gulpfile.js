'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-clean-css'),
    imageMin = require('gulp-imagemin'),
    pump = require('pump'),
    browserSync = require('browser-sync').create(),
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

// (3) As a developer, I should be able to run the 'gulp scripts' command at the
// command line to ✓(1) concatenate, ✓(2) minify, and ✓(3) copy all of the project’s JavaScript
// files into an all.min.js file that is then copied to the dist/scripts folder

// (2) As a developer, when I run the gulp scripts or gulp styles commands at the
// command line, source maps are generated for the ✓(1) JavaScript and ✓(2) CSS files
// respectively.

gulp.task('scripts', function() {
  pump([
    gulp.src(options.src + '/**/*.js'),
    maps.init(),
    // concat('all.js'),
    concat('all.min.js'),
    uglify(),
    maps.write('./'),
    // gulp.dest(options.dist + '/scripts'),

    // rename('all.min.js'),
    // uglify(),
    // maps.write('./'),
    gulp.dest(options.dist + '/scripts')
    ],
    pumpCb
  );
});

// (3) As a developer, I should be able to run the 'gulp styles' command at the command
// line to ✓(1) compile the project’s SCSS files into CSS, ✓(2) _then_ concatenate and minify
// into an all.min.css file that is ✓(3) then copied to the dist/styles folder.

// (2) As a developer, when I run the gulp scripts or gulp styles commands at the
// command line, source maps are generated for the ✓(1) JavaScript and ✓(2) CSS files
// respectively.

gulp.task('styles', function(){
  pump([
    gulp.src(options.src + '/sass/*.scss'),
    sass(),
    maps.init(),
    // concat('all.css'),
    // gulp.dest(options.dist + '/styles'),
    // rename('all.min.css'),
    concat('global.css'),
    minifyCss(),
    rename('all.min.css'),
    maps.write('./'),
    gulp.dest(options.dist + '/styles')
    // browserSync.stream()
    ],
    pumpCb
  );
});

// gulp.task('devStyles', function(){
//   gulp.src(options.src + '/sass/*.scss')
//     .pipe(sass())
//     .pipe(concat())
//     .pipe(gulp.dest(options.src + '/css/global.css'))
// });

// As a developer, I should be able to run the gulp images command at the
// command line to optimize the size of the project’s JPEG and PNG (GIF AND SVG)
// files, and then copy those optimized images to the dist/content folder.
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

// Minfied SVG files saves another ~59kb in current build
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

// As a developer, I should be able to run the gulp clean command at the
// command line to delete all of the files and folders in the dist folder.

gulp.task('clean', function(){
  return del(options.dist);
});

// export const clean = () => del(options.dist);

//Watch task has to be a function in Gulp 4+

// function watchFiles() {
//   gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
//   gulp.watch(options.src + '/sass/**/*.sass', ['styles']);
//   // gulp.watch(options.src + '/*.html').on('change', browserSync.reload);
// }
// export { watchFiles as watch };


gulp.task('watchFiles', function(){
  gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
  gulp.watch(options.src + '/sass/**/*.sass', ['styles']);
  gulp.watch(options.src + '/*.html').on('change', browserSync.reload);
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

// As a developer, I should be able to run the gulp build command at the
// command line to run the clean, scripts, styles, and images tasks with
// confidence that the clean task completes before the other commands.

gulp.task('build', ['clean'], function(){
  //Serialize so that html is after the other tasks
    gulp.start(['scripts', 'styles', 'images'/*, 'icons' */]);
    gulp.start('html');
    gulp.start('watchFiles');
});

gulp.task('webserver', function() {
  connect.server();
});

// As a developer, I should be able to run the gulp command at the command
// line to run the build task and serve my project using a local web server.
gulp.task('default',['build'], function(){
  gulp.start('webserver');
});

// As a developer, when I run the default gulp command, it should continuously
// watch for changes to any .scss file in my project.
  // When there is a change
  // to one of the .scss files, the gulp styles command is run and the files
  // are compiled, concatenated, and minified to the dist folder. My project
  // should then reload in the browser, displaying the changes. (browserSync)
  // Static Server + watching scss/html files
    // gulp.task('serve', ['sass'], function() {
    //
    //     browserSync.init({
    //         server: "./app"
    //     });
    //
    //     gulp.watch("app/scss/*.scss", ['sass']);
    //     gulp.watch("app/*.html").on('change', browserSync.reload);
    // });
    //
    // // Compile sass into CSS & auto-inject into browsers
    // gulp.task('sass', function() {
    //     return gulp.src("app/scss/*.scss")
    //         .pipe(sass())
    //         .pipe(gulp.dest("app/css"))
    //         .pipe(browserSync.stream());
    // });
    //
    // gulp.task('watchStyles',function() {
    //     gulp.watch('sass/global.scss', ['styles']);
    // });
    //
    // gulp.task('default', ['serve']);
