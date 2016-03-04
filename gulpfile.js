var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('css', function() {
  gulp.src('public/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['css']);
