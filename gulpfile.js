var gulp = require('./gulp')();
 
gulp.task('build', ['concat-js', 'concat-css']);
gulp.task('watch', ['watch-js', 'watch-css']);
gulp.task('default', ['build', 'watch']);
