var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
//var exec = require('gulp-exec');
var exec = require('child_process').exec;
var git = require('gulp-git');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

/// watch
gulp.task('watch', function(callback) {
  watch('**/*.less', batch(function(events, done) {
    gulp.start('less-theme', done);
  }));
});

/// Commit do Fonte
gulp.task('commit-source', function(callback) {
  fs.writeFile('README.md', (new Date()));
  gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Publish ' + (new Date())))
    .pipe(git.push('origin', 'master', {args: ' -f'}, function(err) { if (err) callback(err); }, callback));

    callback();
});

/// Comilar o Hugo
gulp.task('compile-hugo', ['compile-hugo-github', 'compile-hugo-jm']);
gulp.task('compile-hugo-github', function(callback) {
  //jmarcon.github.io
  exec('hugo --config="config_github.toml"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });

  callback();
});
gulp.task('compile-hugo-jm', function() {
  //www.julianomarcon.com.br
  exec('hugo --config="config_jm.toml"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
  callback();
});

/// Compilar o LESS
gulp.task('less', ['less-theme', 'less-github', 'less-jm']);
gulp.task('less-theme', function(callback) {
  gulp.src('themes/hugo-geo/static/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('themes/hugo-geo/static/css'))
    .on('end', function() { callback(); });
});
gulp.task('less-github', ['less-theme', 'compile-hugo-github'], function(callback) {
  // jmarcon.github.io
  gulp.src('public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'))
    .on('end', callback);
});
gulp.task('less-jm', ['less-theme', 'compile-hugo-jm'], function(callback) {
  // www.julianomarcon.com.br
  gulp.src('www/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'))
    .on('end', callback);
});

/// Minificar o CSS
gulp.task('minify-css', ['minify-css-github', 'minify-css-jm']);
gulp.task('minify-css-github', ['less-github'], function(callback) {
  // jmarcon.github.io
  gulp.src('public/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('public/css'))
    .on('end', callback);
});
gulp.task('minify-css-jm', ['less-jm'], function(callback) {
  // www.julianomarcon.com.br
  gulp.src('www/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('www/css'))
    .on('end', callback);
});

/// Publicar
gulp.task('publish', ['publish-github', 'publish-jm']);

gulp.task('publish-github', ['compile-hugo-github', 'less-github', 'minify-css-github'], function(callback) {
  process.chdir('./public');
  var data = (new Date());
  fs.writeFile('README.md', data);

  gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Publish ' + data))
    .pipe(git.push('origin', 'master', {args: ' -f'}, function(err) {if (err) callback(err);}, callback));

    callback();
});

gulp.task('publish-jm', function() {
  shell.task([
    'echo FTP'
  ]);
});



/// Pontos de Entrada
gulp.task('default', [
  'commit-source',
  'compile-hugo',
  'less',
  'minify-css',
  'publish'
]);

gulp.task('github', [
  'commit-source',
  'compile-hugo-github',
  'less-github',
  'minify-css-github',
  'publish-github'
]);

gulp.task('jm', [
  'commit-source',
  'compile-hugo-jm',
  'less-jm',
  'minify-css-jm',
  'publish-jm'
]);
