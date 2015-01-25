var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 8005
  });
});

var reloadPattern = ['./{css,js,views}/**/*.{css,js,html}', './index.html'];

gulp.task('reload', function () {

  gulp.src(reloadPattern)
    .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(reloadPattern, ['reload']);
});

gulp.task('default', ['connect', 'watch']);
