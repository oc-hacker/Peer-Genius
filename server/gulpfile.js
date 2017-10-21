var path = require('path');
var gulp = require('gulp');
var gulpts = require('gulp-typescript');

var buildpath = path.resolve(__dirname, '../build');

gulp.task('configure', function () {
  return gulp.src(path.resolve(__dirname, '.env'))
    .pipe(gulp.dest(buildpath));
});

gulp.task('compile', function () {
  return gulp.src('./**/*.ts')
    .pipe(gulpts(require('./tsconfig.json').compilerOptions))
    .pipe(gulp.dest(buildpath));
});

gulp.task('default', ['compile', 'configure']);