"use strict";
//http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html

let gulp = require('gulp');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let livereload = require('gulp-livereload');
let gulprename = require('gulp-rename');
let cssmin = require('gulp-cssmin');
let uglify = require('gulp-uglify');
let streamify = require('gulp-streamify');
let less = require('gulp-less');
let path = require('path');
let exit = require('gulp-exit');

//

gulp.task('buildDebug', function() {
  livereload({start:true});
  
    return browserify({
      entries : './client/js/app.js',
      extensions : ['.jsx'],
      debug : true
    })
    .transform(babelify)
    .bundle()
    .pipe( source('app.min.js'))
    .pipe( gulp.dest('dist/js') )
    .pipe( livereload() );
});

gulp.task('buildRelease', function() {
    return browserify({
      entries : './client/js/app.js',
      extensions : ['.jsx'],
      debug : false
    })
    .transform(babelify)
    .bundle()
    .pipe( source('app.min.js'))
    .pipe( streamify(uglify()) )
    .pipe( gulp.dest('dist/js') )
    .pipe( livereload() );
});

gulp.task('buildLess', function () {
  return gulp.src('./client/less/*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulprename('app.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('copyIndexHTML', () => {
  gulp.src('client/index.html')
    .pipe( gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('copyFontAwesomeFontDir', () => {
  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe( gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('client/**/*', ['buildDebug']);
  gulp.watch('client/less/*', ['buildLess']);
  gulp.watch('client/index.html',['copyIndexHTML']);
});

gulp.task('build' , ['default']);
gulp.task('default', ['buildRelease', 'buildLess', 'copyFontAwesomeFontDir','copyIndexHTML']);
gulp.task('develop', ['default','buildDebug','watch']);
