const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const concat = require('gulp-concat');

const server = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
};
exports.server = server;

const minify = () => {
  return gulp
    .src('./css/files/*.css')
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(cssMinify({ compatibility: 'ie8' }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};
exports.minify = minify;

const watch = () => {
  gulp.watch('./css/files/*.css', minify);
  gulp.watch('./*.html').on('change', browserSync.reload);
};
exports.watch = watch;

exports.default = gulp.parallel(watch, server, minify);
