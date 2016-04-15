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
  var date = new Date();
  fs.writeFile('README.md', (date));

  var pkg = require('./package.json');
  var v = 'v' + pkg.version + ' : ' + date;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.add())
    .pipe(git.commit(message));
});

gulp.task('push-source', ['commit-source'], function(callback){
  git.push('origin','master',{args: ' -f --tags'}, function(err) { if(err) callback(err); });
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

gulp.task('push-github', ['push-source'], function(callback) {
  process.chdir('./public');
  var data = (new Date());
  fs.writeFile('README.md', data);

  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  gulp.src('./public')
    .pipe(git.add());

  git.commit(message, { cwd: './public', quiet: true});
  git.tag(v, message, { cwd: './public', quiet: true});

  return git.push('origin','master',{args: ' -f --tags', cwd: './public'}, function(err) { if(err) callback(err); }, callback);

});

gulp.task('push-jm', ['push-source'], function() {
  return shell.task([
    'echo FTP'
  ]);
});

/// Pontos de Entrada
gulp.task('default', function(callback) {
  sequence(
  ['compile-hugo-github', 'compile-hugo-jm'],
  ['less-github', 'less-jm'],
  ['minify-css-github', 'minify-css-jm'],
  ['push-github', 'push-jm'],
  callback
  );
});

gulp.task('github', ['commit-source'], function(callback) {
  return sequence(
  'less-github',
  'minify-css-github',
  'push-github',
  callback);
});

gulp.task('jm', function(callback) {
  sequence(
  'less-jm',
  'minify-css-jm',
  'push-jm',
  callback);
});
