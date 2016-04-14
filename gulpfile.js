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

/// Commit do Fonte
gulp.task('commit-source', function(callback) {
  fs.writeFile('README.md', (new Date()));
  return gulp.src('.')
    .pipe(git.add())
    .on('end', function() { util.log ('git added.'); })
    .pipe(git.commit('Publish ' + (new Date())))
    .pipe(git.push('origin', 'master', {args: ' -f'}, function(err) { if (err) callback(err); }, callback))
    .pipe(gulp.dest('./tmp'))
    .on('end', function() { callback(); });
});

/// Comilar o Hugo
gulp.task('compile-hugo-github', function(callback) {
  //jmarcon.github.io
  return exec('hugo --config="config_github.toml"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});
gulp.task('compile-hugo-jm', function() {
  //www.julianomarcon.com.br
  return exec('hugo --config="config_jm.toml"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

/// Compilar o LESS
gulp.task('less-theme', function(callback) {
  return gulp.src('themes/hugo-geo/static/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('themes/hugo-geo/static/css'));
});
gulp.task('less-github', ['less-theme', 'compile-hugo-github'], function(callback) {
  // jmarcon.github.io
  return gulp.src('public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});
gulp.task('less-jm', ['less-theme', 'compile-hugo-jm'], function(callback) {
  // www.julianomarcon.com.br
  return gulp.src('www/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

/// Minificar o CSS
gulp.task('minify-css-github', function(callback) {
  // jmarcon.github.io
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('public/css'));
});
gulp.task('minify-css-jm', function(callback) {
  // www.julianomarcon.com.br
  return gulp.src('www/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('www/css'));
});

/// Publicar
gulp.task('publish', function(callback) {
   sequence(['github', 'jm'], callback);
});

gulp.task('push-github', function(callback) {
  process.chdir('./public');
  var data = (new Date());
  fs.writeFile('README.md', data);

  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Publish ' + data))
    .pipe(git.push('origin', 'master', {args: ' -f'}, function(err) {if (err) callback(err);}, callback));
});

gulp.task('push-jm', function() {
  return shell.task([
    'echo FTP'
  ]);
});

/// Pontos de Entrada
gulp.task('default', function(callback) {
  sequence(
  'commit-source',
  ['compile-hugo-github', 'compile-hugo-jm'],
  ['less-github', 'less-jm'],
  ['minify-css-github', 'minify-css-jm'],
  ['push-github', 'push-jm'],
  callback
  );
});

gulp.task('github',  function(callback) {
  return sequence(
  'commit-source',
  'less-github',
  'minify-css-github',
  'push-github',
  callback);
});

gulp.task('jm', function(callback) {
  sequence(
  'commit-source',
  'less-jm',
  'minify-css-jm',
  'push-jm',
  callback);
});
