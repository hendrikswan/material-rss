var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 8005
  });
});

gulp.task('reload', function () {
  gulp.src('./*.*')
    .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(['./*.*'], ['reload']);
});

gulp.task('default', ['connect', 'watch']);
