var gulp = require('gulp');
var gulpts = require('gulp-typescript');

gulp.task('configure', function () {
  return gulp.src('server/.env')
    .pipe(gulp.dest('server/build/dist'));
});

gulp.task('transfer', function() {
  return gulp.src('public/**/*.*')
    .pipe(gulp.dest('server/build/public'));
});

gulp.task('compile', function () {
  return gulp.src('server/**/*.ts')
    .pipe(gulpts(require('./server/tsconfig.json').compilerOptions))
    .pipe(gulp.dest('server/build/dist'));
});

gulp.task('server', ['compile', 'configure', 'transfer']);
