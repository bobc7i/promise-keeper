const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine');

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('transpile:src', () => {
	return gulp.src('js/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('transpile:spec', () => {
	return gulp.src('spec/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/spec'));
});

gulp.task('test', () =>
	gulp.src('dist/spec/*.js')
		// gulp-jasmine works on filepaths so you can't have any plugins before it
		.pipe(jasmine())
);

gulp.task('transpile', ['transpile:src', 'transpile:spec']);
gulp.task('default', ['clean', 'transpile', 'test']);
