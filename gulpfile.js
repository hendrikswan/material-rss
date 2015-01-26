var gulp = require('gulp');

gulp.task('express', function() {
  var app = require('./web');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  console.log(fileName);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}


var reloadPattern = ['./public/{css,js,views}/**/*.{css,js,html}', './public/index.html'];

gulp.task('watch', function() {
  gulp.watch(reloadPattern, notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
