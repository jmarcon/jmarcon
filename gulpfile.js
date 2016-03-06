var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var shell = require('gulp-shell');
var git = require('gulp-git');

gulp.task('commit-source', function(){
  gulp.src('.')
      .pipe(git.add())
      .pipe(git.commit('Publish ' + (new Date())));

  git.push('origin', 'master', {args: " -f"}, function (err) {
    if (err) throw err;
  });
});

gulp.task('compile-hugo', ['compile-hugo-github', 'compile-hugo-jm']);

gulp.task('compile-hugo-github', function(){
  shell.task([
    'hugo -D --config="config.toml"' //jmarcon.github.io
  ]);
});

gulp.task('compile-hugo-jm', function(){
  shell.task([
    'hugo --config="config_jm.toml"'  //www.julianomarcon.com.br
  ]);
});

gulp.task('less', ['less-github', 'less-jm']);

gulp.task('less-github', function(){
  // jmarcon.github.io
  gulp.src('public/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('public/css'));
});

gulp.task('less-jm', function(){
  // www.julianomarcon.com.br
  gulp.src('www/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('public/css'));
});

gulp.task('minify-css', ['minify-css-github', 'minify-css-jm']);

gulp.task('minify-css-github', function() {
  // jmarcon.github.io
  gulp.src('public/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify-css-jm', function() {
  // www.julianomarcon.com.br
  gulp.src('www/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('www/css'));
});

gulp.task('default',
  [
    'commit-source',
    'compile-hugo',
    'less',
    'minify-css'
  ]);

gulp.task('github',
  [
    'commit-source',
    'compile-hugo-github',
    'less-github',
    'minify-css-github'
  ]);

gulp.task('jm',
  [
    'commit-source',
    'compile-hugo-jm',
    'less-jm',
    'minify-css-jm'
  ]);
