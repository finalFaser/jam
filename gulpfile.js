'use strict';

var gulp        = require('gulp');
var clean       = require('gulp-clean');
var sourcemaps  = require('gulp-sourcemaps');
//var rename      = require('gulp-rename');
var growserify  = require('gulp-browserify');
//var browserify  = require('browserify');
//var babelify    = require('babelify');
var runSequence = require('run-sequence');

/************* PATHS ***************/
var projBasePath = './';
var devBasePath  = projBasePath + 'dev/';

var assetsBasePath = devBasePath + 'assets/';
var cssBasePath    = devBasePath + 'css/';
var jsBasePath     = devBasePath + 'js/';

var assetsFiles  = assetsBasePath + '**/*.*';
var htmlFiles    = devBasePath + 'index.html';
var cssFiles     = cssBasePath + '*.css';
var jsFiles      = jsBasePath + 'main.js';

var prodDest = 'prod/';

var prodAssets = prodDest + 'assets/';
var prodCss    = prodDest + 'css/';
var prodJs     = prodDest + 'js/';

/************* BROWSERIFY ***************/
gulp.task('browserify', function() {
    return gulp.src(jsFiles)
        .pipe(growserify({
//            transform: [babelify],
            debug: true
        }))
//        .pipe(rename('main.js'))
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(prodJs));
});

gulp.task('copy-lib', function() {
    return gulp.src(jsBasePath + 'phaser.min.js')
        .pipe(gulp.dest(prodJs));
});

gulp.task('watch-js', ['copy-lib', 'browserify'], function() {
    return gulp.watch(jsBasePath + '**/*.js', ['copy-lib', 'browserify']);
});

gulp.task('copy-css', function() {
    return gulp.src(cssFiles)
        .pipe(gulp.dest(prodCss));
});

gulp.task('watch-css', ['copy-css'], function() {
    return gulp.watch(cssFiles, ['copy-css']);
});

gulp.task('copy-assets', function() {
    return gulp.src(assetsFiles)
        .pipe(gulp.dest(prodAssets));
});

gulp.task('watch-assets', ['copy-assets'], function() {
    return gulp.watch(assetsFiles, ['copy-assets']);
});

gulp.task('copy-html', function() {
    return gulp.src(htmlFiles)
        .pipe(gulp.dest(prodDest));
});

gulp.task('watch-html', ['copy-html'], function() {
    return gulp.watch(htmlFiles, [ 'copy-html' ]);
});

gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('default', function() {
    runSequence('clean', ['watch-html', 'watch-assets', 'watch-css', 'watch-js']);
});
