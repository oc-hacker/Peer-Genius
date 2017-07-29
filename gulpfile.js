var gulp = require('gulp');
var gulpts = require('gulp-typescript');

gulp.task('configure', ['compile'], function () {
	return gulp.src('server/**/*.json')
		.pipe(gulp.dest('build'))
});

gulp.task('compile', function () {
	return gulp.src('server/**/*.ts')
		.pipe(gulpts({
			module: 'commonjs',
			target: 'es6',
			outDir: 'build'
		}))
		.pipe(gulp.dest('build'))
});

gulp.task('server', ['compile', 'configure']);
