var gulp = require('gulp');
var gulpts = require('gulp-typescript');

gulp.task('configure', function () {
	return gulp.src('server/**/*.json')
		.pipe(gulp.dest('build'))
});

gulp.task('compile', function () {
	return gulp.src('server/**/*.ts')
		.pipe(gulpts(require('./tsconfig.json').compilerOptions))
		.pipe(gulp.dest('build'))
});

gulp.task('server', ['compile', 'configure']);
