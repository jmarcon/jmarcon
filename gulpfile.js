var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var exec = require('gulp-exec');
var git = require('gulp-git');


/// Commit do Fonte
gulp.task('commit-source', function(callback) {
  gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Publish ' + (new Date())))
    .on('end', function() { callback(); });

  git.push('origin', 'master', {args: ' -f'}, function(err){
      if (err) throw err;
  }, callback);
});

/// Comilar o Hugo
gulp.task('compile-hugo', ['compile-hugo-github', 'compile-hugo-jm']);
gulp.task('compile-hugo-github', function(callback) {

  gulp.src('.')
    .pipe(exec('hugo -D --config="config.toml"'))
    .pipe(exec.reporter()) //jmarcon.github.io
    .on('end', function() { callback(); });
});
gulp.task('compile-hugo-jm', function() {
  gulp.src('.')
  .pipe(exec('hugo --config="config_jm.toml"'))
  .pipe(exec.reporter()) //www.julianomarcon.com.br
  .on('end', function() { callback(); });
});

/// Compilar o LESS
gulp.task('less', ['less-github', 'less-jm']);
gulp.task('less-github', ['compile-hugo-github'], function(callback) {
  // jmarcon.github.io
  gulp.src('public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'))
    .on('end', function() { callback(); });
});
gulp.task('less-jm', ['compile-hugo-jm'], function(callback) {
  // www.julianomarcon.com.br
  gulp.src('www/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'))
    .on('end', function() { callback(); });
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
    .on('end', function() { callback(); });
});
gulp.task('minify-css-jm', ['less-jm'], function(callback) {
  // www.julianomarcon.com.br
  gulp.src('www/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('www/css'))
    .on('end', function() { callback(); });
});

//



/// Publicar
gulp.task('publish', ['publish-github', 'publish-jm']);
gulp.task('publish-github', ['compile-hugo-github', 'less-github', 'minify-css-github'], function(callback) {
  process.chdir('./public');
  gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Publish ' + (new Date())))
    .on('end', function() { callback(); });

  git.push('origin', 'master', {args: ' -f'}, function(err){
      if (err) throw err;
  }, callback);
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
