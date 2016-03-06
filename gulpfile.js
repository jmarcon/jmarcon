var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var shell = require('gulp-shell');
var git = require('gulp-git');

/// Commit do Fonte
gulp.task('commit-source', function(callback) {
  gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Publish ' + (new Date())))
    .on('end', function() { done(); });

  git.push('origin', 'master', {args: ' -f'}, function(err){
      if (err) throw err;
  }, callback);
});

/// Comilar o Hugo
gulp.task('compile-hugo', ['compile-hugo-github', 'compile-hugo-jm']);
gulp.task('compile-hugo-github', function() {
  shell.task([
    'hugo -D --config="config.toml"' //jmarcon.github.io
  ]);
});
gulp.task('compile-hugo-jm', function() {
  shell.task([
    'hugo --config="config_jm.toml"' //www.julianomarcon.com.br
  ]);
});

/// Compilar o LESS
gulp.task('less', ['less-github', 'less-jm']);
gulp.task('less-github', ['compile-hugo-github'], function() {
  // jmarcon.github.io
  gulp.src('public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});
gulp.task('less-jm', ['compile-hugo-jm'], function() {
  // www.julianomarcon.com.br
  gulp.src('www/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

/// Minificar o CSS
gulp.task('minify-css', ['minify-css-github', 'minify-css-jm']);
gulp.task('minify-css-github', ['less-github'], function() {
  // jmarcon.github.io
  gulp.src('public/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('public/css'));
});
gulp.task('minify-css-jm', ['less-jm'], function() {
  // www.julianomarcon.com.br
  gulp.src('www/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('www/css'));
});

//



/// Publicar
gulp.task('publish', ['publish-github', 'publish-jm']);
gulp.task('publish-github', ['compile-hugo-github', 'less-github', 'minify-css-github'], function() {
  shell.task([
    'echo ' + (new Date()),
    'sh _publish.sh"' //jmarcon.github.io
  ]);
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
