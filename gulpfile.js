var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var shell = require('gulp-shell');

gulp.task('publish', shell.task([
  'sh _publish.sh'
]));

var commitCommand = 'git commit -a -m "'+ (new Date()) +'"';
gulp.task('commit_src', shell.task([
  'git add .',
  commitCommand,
  'git push -f origin master'
]));

gulp.task('commit_compile', shell.task([
  'cd public',
  'git add .',
  commitCommand,
  'git push -f origin master'
]));

gulp.task('css', function() {
  gulp.src('public/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('public/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['css', 'minify-css']);

gulp.task('github', ['default']);
gulp.task('jm', ['default']);
