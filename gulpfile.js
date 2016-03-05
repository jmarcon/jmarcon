var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var shell = require('gulp-shell');
var git = require('gulp-git');

gulp.task('publish_jm', shell.task([
  'sh _publish_jm.sh'
]));

gulp.task('publish_git', shell.task([
  'hugo -D --config="config.toml"',
  'cd public',
  'git add .',
  'git commit -a -m "Publish $NOW"',
  'git push -f origin master'
]));

gulp.task('push', function() {
  gulp.src('.')
      .pipe(git.add())
      .pipe(git.commit('Publish ' + (new Date())))
      .pipe(git.push('origin', 'master', {args: " -f"}, function (err) {
              if (err) throw err;
            }));
});

gulp.task('less', function() {
  gulp.src('public/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('public/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['less', 'minify-css']);

gulp.task('github', ['default', 'publish_git']);
gulp.task('jm', ['default', 'publish_jm']);
