var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
//var exec = require('gulp-exec');
var exec = require('child_process').exec;
var git = require('gulp-git');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sequence = require('run-sequence');
var util = require('gulp-util');

/// watch
gulp.task('watch', function(callback) {
  watch('**/*.less', batch(function(events, done) {
    gulp.start('less-theme', done);
  }));
});


/// Comilar o Hugo
gulp.task('compile', function(callback) {
  //jmarcon.github.io
  return exec('hugo --config="config_github.toml"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

/// Compilar o LESS
gulp.task('less', function(callback) {
  return gulp.src('themes/hugo-geo/static/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('themes/hugo-geo/static/css'));
});

/// Minificar o CSS
gulp.task('minify-css', function(callback) {
  // jmarcon.github.io
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('public/css'));
});

/// Pontos de Entrada
gulp.task('default', function(callback) {
  sequence(
  ['less', 'compile', 'minify-css'],
  callback
  );
});
