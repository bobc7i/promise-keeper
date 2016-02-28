const gulp = require('gulp');
const del = require('del');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine');

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('transpile:src', ['clean'], () => {
	return gulp.src('js/**/*.js')
    // .pipe(watch('js/**/*.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('transpile:spec', ['clean'], () => {
	return gulp.src('spec/**/*.js')
    // .pipe(watch('spec/**/*.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/spec'));
});

gulp.task('test', ['transpile'], () =>
	gulp.src('dist/spec/*.js')
		.pipe(jasmine())
);

gulp.task('transpile', ['transpile:src', 'transpile:spec']);
gulp.task('build', ['test']);
gulp.task('default', ['build']);
