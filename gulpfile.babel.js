'use strict';

import 'babel-polyfill';
import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('default', () => {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.js', ['default']);
});
